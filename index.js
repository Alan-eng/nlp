// var nlp = import('compromise') 



const form = window.document.getElementById('form');




form.onsubmit = (e) => {
    e.preventDefault();

    const textRAW = window.document.getElementById('input').value;


    const subject = nlp(textRAW).match('#Noun').out('array')[0];
    const subjectIsPlural = nlp(subject).nouns().isPlural().length > 0;
    const predicate = nlp(textRAW).match('#Verb').out('array')[0];
    const predicateForms = nlp(predicate).verbs().conjugate()[0];
    const auxilaryVerb = {
        present: subjectIsPlural ? 'are' : 'is',
        perfect: subjectIsPlural ? 'have' : 'has',
        perfectContinuous: subjectIsPlural ? 'have been' : 'has been'
    }
    const times ={
        present: {
            indefinite: `${subject} ${predicateForms.Infinitive}`,
            continuous: `${subject} ${auxilaryVerb.present} ${predicateForms.Gerund}`,
            perfect: `${subject} ${auxilaryVerb.perfect} ${predicateForms.PastTense}`,
            perfectContinuous: `${subject} ${auxilaryVerb.perfectContinuous} ${predicateForms.Gerund}`,
        }
    }
    
    console.log('indefinite', times.present.indefinite)
    console.log('continuous', times.present.continuous)
    console.log('perfect', times.present.perfect)
    console.log('perfectContinuous', times.present.perfectContinuous)
    
    var textNLPNormalize = nlp(textRAW).normalize()
    console.log('--pronouns',textNLPNormalize.people().pronoun())
    console.log('--people',textNLPNormalize.people().data())
    console.log(textNLPNormalize.verbs().data())
    console.log(textNLPNormalize.nouns().data())
    // const negativeText = textNLPNormalize.sentences().toNegative().out()
    const questionText = nlp(textRAW).sentences().toQuestion().out()

    let newDiv = document.createElement('div')
    newDiv.innerHTML= questionText
    document.body.appendChild(newDiv)
}


