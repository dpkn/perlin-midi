
const easymidi = require('easymidi');
const noise = require('simplenoise')

noise.seed(Math.random());

let output = new easymidi.Output('Cool Bean', true);
console.log(easymidi.getOutputs());
console.log(easymidi.getInputs());

let counter = 0;
setTimeout(playNote,100);

function playNote(){

    let noisesample = 0.5 + noise.simplex2(counter, 3)
    let note = 20 +  Math.abs(Math.round(55 * noisesample));

    output.send('noteon', {
        note: note,
        velocity: 127,
        channel: 3
    });

    let duration = Math.floor(50 + Math.abs((0.5 + noise.simplex2(counter, 5))*500))
    console.log('Play note ' + note + ' for '+duration + 'ms');

    setTimeout(() => {

        output.send('noteoff', {
            note: note,
            velocity: 0,
            channel: 3
        });

        console.log('Stop note ' + note);

    }, duration);

    let nextnote = Math.floor(50 + Math.abs((0.5 + noise.simplex2(counter, 10))*400))
    setTimeout(playNote,nextnote);

    counter+= 0.05;
}