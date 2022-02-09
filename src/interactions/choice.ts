import '../styles/choice.css';
import rightFeedback from '../images/LI00000013.svg';
import wrongFeedback from '../images/LI00000009.svg';
export default function choiceInteraction(xmlDoc: Document, fragment: DocumentFragment) {
    xmlDoc.querySelectorAll('qti-choice-interaction').forEach(el => {
        const responseId = el.getAttribute('response-identifier');
        const isShuffle = el.getAttribute('shuffle') === 'true';
        const buttons = fragment.querySelectorAll<HTMLButtonElement>(
            `form#qti-choice-interaction-${responseId} button`
        );

        const form = fragment.querySelector<HTMLFormElement>(`form#qti-choice-interaction-${responseId}`)!;
        const answers = Array.from(
            xmlDoc.querySelectorAll(
                `qti-response-declaration[identifier="${responseId}"] qti-correct-response qti-value`
            )
        ).map(el => el.textContent);
        buttons.forEach(el => {
            if (isShuffle) el.style.order = Math.floor(Math.random() * 1000).toString();
            //눌렀을 때 계속 눌린 상태로 유지
            el.addEventListener('click', () => {
                el.classList.toggle('selected');
            });
        });
        form.onsubmit = e => {
            e.preventDefault();
            const { submitter } = e;
            if (submitter) {
                const userAns = submitter.getAttribute('name');
                const isAns = answers.includes(userAns || '');
                const { left, width, top } = submitter.getBoundingClientRect();
                //feedback 생성
                const img = document.createElement('img');
                img.src = isAns ? rightFeedback : wrongFeedback;
                img.style.position = 'absolute';
                img.style.left = left + width - 10 + 'px';
                img.style.top = top - 42 + 'px';
                document.body.append(img);
                //feedback제거
                setTimeout(() => {
                    document.body.removeChild(img);
                }, 300);
            }
        };
    });
}
