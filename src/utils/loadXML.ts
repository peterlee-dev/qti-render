export default function loadXML(url: string): Promise<Document> {
    const parser = new DOMParser();
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.send(null);
    return new Promise(resolve =>
        xhr.addEventListener('loadend', () => {
            resolve(parser.parseFromString(xhr.responseText, 'text/xml'));
        })
    );
}
