
import React from 'react';

const ProcessVisualization = () => {
  return (
    <section id="technologie" className="py-20 px-6 bg-muted/20">
      <div className="container mx-auto max-w-6xl text-center">
        <h2 className="text-4xl font-bold mb-12 text-foreground">
          Der Agentic Workflow im Hintergrund
        </h2>
        
        <div className="w-full min-h-[600px] rounded-lg bg-card border p-8 flex items-center justify-center">
          <div className="relative w-full max-w-4xl">
            {/* Host Agent - Center */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="bg-primary text-primary-foreground rounded-lg p-6 shadow-lg min-w-[180px] text-center">
                <h3 className="font-semibold text-lg mb-2">Host Agent</h3>
                <p className="text-sm opacity-90">Zentrale Steuerung</p>
              </div>
            </div>

            {/* Cross Selling Agent - Left */}
            <div className="absolute top-1/2 left-8 transform -translate-y-1/2">
              <div className="bg-accent text-accent-foreground rounded-lg p-6 shadow-lg min-w-[180px] text-center">
                <h3 className="font-semibold text-lg mb-2">Cross Selling Agent</h3>
                <p className="text-sm opacity-90">Produktempfehlungen</p>
              </div>
            </div>

            {/* Communications Agent - Right */}
            <div className="absolute top-1/2 right-8 transform -translate-y-1/2">
              <div className="bg-secondary text-secondary-foreground rounded-lg p-6 shadow-lg min-w-[180px] text-center">
                <h3 className="font-semibold text-lg mb-2">Communications Agent</h3>
                <p className="text-sm opacity-90">Kundenkommunikation</p>
              </div>
            </div>

            {/* Connection Lines */}
            {/* Line from Host to Cross Selling */}
            <div className="absolute top-1/2 left-[200px] w-[calc(50%-280px)] h-0.5 bg-border transform -translate-y-1/2">
              <div className="absolute -left-2 -top-2 w-4 h-4 bg-primary rounded-full"></div>
              <div className="absolute -right-2 -top-2 w-4 h-4 bg-accent rounded-full"></div>
            </div>

            {/* Line from Host to Communications */}
            <div className="absolute top-1/2 right-[200px] w-[calc(50%-280px)] h-0.5 bg-border transform -translate-y-1/2">
              <div className="absolute -left-2 -top-2 w-4 h-4 bg-primary rounded-full"></div>
              <div className="absolute -right-2 -top-2 w-4 h-4 bg-secondary rounded-full"></div>
            </div>

            {/* Communication Labels */}
            <div className="absolute top-[calc(50%-40px)] left-[calc(25%)] text-xs text-muted-foreground text-center">
              Produktdaten<br/>& Empfehlungen
            </div>
            <div className="absolute top-[calc(50%-40px)] right-[calc(25%)] text-xs text-muted-foreground text-center">
              Kundeninteraktion<br/>& Feedback
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessVisualization;
