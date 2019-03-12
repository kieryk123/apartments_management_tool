import Vue from 'vue';

Vue.filter('formatMoney', (value) => {
    value = value.toString();
    let group1 = '';
    let group2 = '';
    let group3 = '';

    const howManyLoops = Math.ceil(value.length/3);

    for (let i = 0; i < howManyLoops; i++) {
        let howManyLeft = value.length - 1;

        if (i == 0) {
            howManyLeft = value.length - 1;
        } else {
            howManyLeft -= i * 3;
        }

        for (let j = howManyLeft; j >= howManyLeft-2; j--) {
            if (j >= 0) {
                if (i == 0) {
                    group1 += value[j];
                } else if (i == 1) {
                    group2 += value[j];
                } else if (i == 2) {
                    group3 += value[j];
                }
            }
        }
    }

    group3 = group3.split('').reverse().join('');
    group2 = group2.split('').reverse().join('');
    group1 = group1.split('').reverse().join('');

    return `${group3.length != 0 ? group3 + '.' : ''}${group2.length != 0 ? group2 + '.' : ''}${group1}`;
});
