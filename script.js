let quotesObj;


var colors = [
    'rgb(0,0,128)',
    'rgb(0,128,128)',
    'rgb(100,0,0)',
    'rgb(85,107,47)',
    'rgb(219,112,147)',
    'rgb(112,128,144)',
    'rgb(210,105,30)',
    'rgb(46,139,87)',
    'rgb(205,92,92)',
    'rgb(176,131,176)',
    'rgb(53,100,67)',
    'rgb(189,128,128)'
];

var currentQuote = '',
    currentAuthor = '';


function getAllQuotes() {
    return $.ajax({
        headers: {
            Accept: 'application/json'
        },
        url: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json',
        success: function (jsonData) {
            if (typeof jsonData === 'string') {
                quotesObj = JSON.parse(jsonData)
            }
        }
    })
}

function getRandomQuote() {
    return quotesObj.quotes[
        Math.floor(Math.random() * quotesObj.quotes.length)
    ]
}

function getQuote() {
    let randomQuote = getRandomQuote();

    currentAuthor = randomQuote.author;
    currentQuote = randomQuote.quote;

    $('#tweet-quote').attr(
        'href',
        'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' +
        encodeURIComponent('"' + currentQuote + '" ' + currentAuthor)
    );

    $('#text').text(randomQuote.quote);
    $('#author').html(randomQuote.author);

    var color = Math.floor(Math.random() * colors.length);
    $('html body').animate(
        {
            backgroundColor: colors[color],
            color: colors[color]
        },
        500
    );
    $('.button').animate(
        {
            backgroundColor: colors[color]
        },
        500
    );
}

$(document).ready(function () {
    getAllQuotes().then(() => {
        getQuote();
    });

    $('#new-quote').on('click', getQuote);
});