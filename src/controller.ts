const app = document.querySelector<HTMLDivElement>('#app')!;
const controller = document.createElement('div');
controller.id = 'controller';

controller.style.display = 'flex';
controller.style.justifyContent = 'center';
controller.style.alignContent = 'center';
controller.style.marginBottom = '2rem';
const beforeButton = document.createElement('button');
beforeButton.textContent = '이전';
const afterButton = document.createElement('button');
afterButton.textContent = '다음';
const questionNumEl = document.createElement('span');
questionNumEl.style.margin = '1rem';
const searchParams = new URLSearchParams(location.search);
export const questionNum = searchParams.get('questionNum') || '01';
questionNumEl.textContent = questionNum;
const questions = ['01', '04', '11', '14', '18', '19', '21', '23', '25', '27'];

let index = questions.indexOf(questionNum);
beforeButton.addEventListener('click', () => {
    if (questions[index - 1]) {
        index--;
        location.href = `/?questionNum=${questions[index]}`;
    }
});

afterButton.addEventListener('click', () => {
    if (questions[index + 1]) {
        index++;
        location.href = `/?questionNum=${questions[index]}`;
    }
});
controller.append(beforeButton);
controller.append(questionNumEl);
controller.append(afterButton);
document.body.insertBefore(controller, app);
