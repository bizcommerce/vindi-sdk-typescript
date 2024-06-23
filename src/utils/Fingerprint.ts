export class Fingerprint {
  private scriptUrl: string;

  constructor(
    scriptUrl: string = 'https://static.traycheckout.com.br/js/finger_print.js',
  ) {
    this.scriptUrl = scriptUrl;
  }

  public generateFingerprint(document: Document): void {
    if (document) {
      const script = document.createElement('script');
      script.src = this.scriptUrl;
      script.type = 'text/javascript';
      document.head.appendChild(script);
    }
  }
}
