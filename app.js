(async () => {

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    } 

    function nobsp(str) {
        let searchfor = ['a', 'an', 'and', 'the', 'of', 'in', 'at', 'to', 'on', 'or', 'as', 'so', 'it'];

        str = str.replace(/\s(\w+[\.|\?|\!]?)$/, "&nbsp$1");

        for (let i = 0; i < searchfor.length; i++) {
            let find = ' ' + searchfor[i] + ' ';
            let replace = ' ' + searchfor[i] + '&nbsp;';
            str = str.replaceAll(find, replace);
            find = '&nbsp;' + searchfor[i] + ' ';
            replace = ' ' + searchfor[i] + '&nbsp;'
            str = str.replaceAll(find, replace);
        }
        return str;
    }

    let response = await fetch('data.json');
    let data = await response.json();
    shuffleArray(data);
    let index = 0;
    let interval = null;

    document.querySelector('button').onclick = function () {
        if (interval) {
            document.querySelector('img').style.animationPlayState = 'paused';
            clearInterval(interval);
            interval = null;
            document.querySelector('button').innerText = 'play';
        } else {
            document.querySelector('img').style.animationPlayState = 'running';
            document.querySelector('button').innerText = 'stop';

            (function play() {
                document.querySelector('blockquote').classList.add('hidden');
                setTimeout(() => {
                    let quote = data[index];
                    index = (index < (data.length - 1)) ? ++index : 0;
                    console.log(index, '/', data.length);
                    document.querySelector('p').innerHTML = nobsp(quote.text);
                    document.querySelector('a').innerText = quote.book + ' by ' + quote.author;
                    document.querySelector('a').setAttribute('href', quote.url);
                    document.querySelector('blockquote').classList.remove('hidden');
                }, 1000);
                interval = setTimeout(play, 10000);
            })();

        }
    };

})();