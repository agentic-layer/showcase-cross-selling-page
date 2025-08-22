
import React from 'react';

const HeroSection = () => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto max-w-4xl text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-foreground">
          Claims Agent für Versicherer
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-medium mb-8 text-accent">
          KI‑gestützter Schadenaufnahme‑Agent
        </h2>
        
        <div className="max-w-3xl mx-auto text-lg leading-relaxed text-muted-foreground space-y-6">
          <p>
            Unser virtueller First‑Level‑Agent begleitet Ihre Kunden von der ersten Meldung eines Kfz‑Schadens bis zur Übergabe an die Schadenabteilung – vollautomatisch, zuverlässig und jederzeit erreichbar.
            Nach der Begrüßung verifiziert der Agent die Identität des Anrufers und führt anschließend Schritt für Schritt durch die Schadenmeldung.
          </p>
          
          <p>
            Dabei erfasst er alle relevanten Angaben wie Kennzeichen, Unfallzeitpunkt, -ort, beteiligte Fahrer sowie den Schadenhergang und erstellt daraus eine strukturierte Schadenakte.
          </p>
          
          <p>
            Am Ende erhält der Kunde eine prägnante Zusammenfassung und erfährt sofort, welche nächsten Schritte folgen. Gleichzeitig werden Gesprächsaufzeichnung und extrahierte Daten automatisch analysiert und per E‑Mail an die zuständige Fachabteilung weitergeleitet – sodass Ihre Prozesse nahtlos weiterlaufen.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
