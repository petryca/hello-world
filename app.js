(async () => {

    let response = await fetch('data.json');
    let data = await response.json(); 

    document.querySelector('button').onclick = function () {
        document.querySelector('blockquote').classList.add('hidden');

        setTimeout(() => {
            var quote = data[Math.floor(Math.random() * data.length)];
            document.querySelector('p').innerText = quote.text;
            document.querySelector('a').innerText = quote.book + ' by ' + quote.author;
            document.querySelector('a').setAttribute('href', quote.url);
            document.querySelector('blockquote').classList.remove('hidden');
        }, 500);
    };

})();