(async () => {

    let response = await fetch('data.json');
    let data = await response.json(); 
    let cache = [...data];

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

    document.querySelector('button').onclick = function () {
        document.querySelector('blockquote').classList.add('hidden');

        setTimeout(() => {
            if (!data.length) data = [...cache];
            let index = Math.floor(Math.random() * data.length);
            let quote = data[index];
            data.splice(index, 1);

            document.querySelector('p').innerHTML = nobsp(quote.text);
            document.querySelector('a').innerText = quote.book + ' by ' + quote.author;
            document.querySelector('a').setAttribute('href', quote.url);
            document.querySelector('blockquote').classList.remove('hidden');
        }, 500);
    };

})();