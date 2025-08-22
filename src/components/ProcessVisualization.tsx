
import React from 'react';

const ProcessVisualization = () => {
  return (
    <section id="technologie" className="py-20 px-6 bg-muted/20">
      <div className="container mx-auto max-w-6xl text-center">
        <h2 className="text-4xl font-bold mb-12 text-foreground">
          Der Agentic Workflow im Hintergrund
        </h2>
        
        <div 
          className="w-full min-h-[600px] rounded-lg flex items-center justify-center p-2"
          style={{ backgroundColor: '#ffffff' }}
        >
          <img 
            src="/lovable-uploads/1d2a1c17-93f0-4034-bbe6-ecc016fde2be.png"
            alt="Agent Workflow Diagram"
            className="max-w-full max-h-full object-contain"
            style={{ 
              filter: 'brightness(1.1) contrast(1.1)',
              imageRendering: 'crisp-edges'
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default ProcessVisualization;
