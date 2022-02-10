import './styles/common.css';
import loadXML from './utils/loadXML';
import choiceInteraction from './interactions/choice';
import { questionNum } from './controller';
Promise.all([loadXML(`xml/${questionNum}/choice${questionNum}.xml`), loadXML('xslt/main.xsl')]).then(r => {
    const [xmlDoc, xslDoc] = r;
    const xsltProcessor = new XSLTProcessor();
    xsltProcessor.importStylesheet(xslDoc);
    xsltProcessor.setParameter(null, 'baseURI', `xml/${questionNum}/`);
    const frag = xsltProcessor.transformToFragment(xmlDoc, document);

    frag.querySelectorAll<HTMLElement>('.soundButton').forEach(el => {
        const audio = frag.getElementById(el.dataset.audioId || '') as HTMLAudioElement;
        el.addEventListener('click', () => {
            audio.play();
        });
    });

    choiceInteraction(xmlDoc, frag);

    const app = document.querySelector<HTMLDivElement>('#app')!;
    app.append(frag);
});
