const login = document.cookie.split(';').find(cookie => cookie.includes('login'));

if (login) {
    $('nav > form').hide();
    let nav = $('nav');

    let welcome = $('<p></p>');
    welcome.text(`Üdv, ${login.split('=')[1]}!`);

    nav.append(welcome);

    let logout = $('<a></a>');
    logout.text('Kijelentkezés');
    logout.attr('href', '/logout');

    nav.append(logout);
}
