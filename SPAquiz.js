let questionIndex = 0;
let questionArray = [];
document.addEventListener('DOMContentLoaded', () =>{

    render_intro_view();
});

const load_question = async (quizType) => {
    try {
        const data = await fetch("https://my-json-server.typicode.com/stevedel31/CUS1172_Project3/db");
        const model = await data.json();
        questionArray = model.quiz.filter(question => question.id.startsWith(quizType));
        console.log(questionArray);
        questionIndex = 0;

        render_view(questionArray[questionIndex]);
    } catch (error) {
        console.error("Error", error);
    }
};

const loadNextQuestion = () => {
    
    if (questionIndex + 1 < questionArray.length) {
        questionIndex++;
        render_view(questionArray[questionIndex]);
    } else {
        alert("No more questions.")
    }
};

const render_view = (question) => {
    let template_source;
    if (question.type === "multiple_choice") {
        template_source = document.querySelector("#multiple_choice").innerHTML;
        console.log("mp");
    } else if (question.type === "text_response") {
        template_source = document.querySelector("#text_response").innerHTML;
        console.log("tr");
    } else if (question.type === "image_select") {
        template_source = document.querySelector("#image_select").innerHTML;
        console.log("is");
    } 

    const template = Handlebars.compile(template_source);
    const html = template(question);
    document.querySelector("#quiz_widget").innerHTML = html;

    const submitButton = document.querySelector("#submit_button");
    if (submitButton) {
        submitButton.addEventListener("click", loadNextQuestion);
    }
};

const render_intro_view = () => {
    const introViewHtml = document.querySelector("#begin_view").innerHTML;
    document.querySelector("#quiz_widget").innerHTML = introViewHtml;

    document.getElementById("java_quiz").addEventListener("click", () => {
        load_question("java"); 
    });

    document.getElementById("webdev_quiz").addEventListener("click", () => {
        load_question("web"); 
    });
}





