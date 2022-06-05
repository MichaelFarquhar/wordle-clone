guess = ['C', 'R', 'A', 'N', 'E'];
word = ['S', 'C', 'R', 'A', 'P'];

guess.forEach((item, index) => {
    if (word.indexOf(item) == index) {
        console.log('Green');
    } else {
        if (word.indexOf(item) > -1) {
            console.log('Yellow');
        } else {
            console.log('None');
        }
    }
});
