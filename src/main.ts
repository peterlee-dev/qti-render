import loadXML from './utils/loadXML';
import choiceInteraction from './interactions/choice';
Promise.all([loadXML('xml/11/choice11.xml'), loadXML('xslt/main.xsl')]).then(r => {
    const [xmlDoc, xslDoc] = r;
    const xsltProcessor = new XSLTProcessor();
    xsltProcessor.importStylesheet(xslDoc);
    xsltProcessor.setParameter(null, 'baseURI', 'xml/11/');
    const frag = xsltProcessor.transformToFragment(xmlDoc, document);

    choiceInteraction(xmlDoc, frag);

    const app = document.querySelector<HTMLDivElement>('#app')!;
    app.append(frag);
});
