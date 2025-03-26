import React, { useState } from 'react';

const Installer = () => {
  const [step, setStep] = useState(1);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <div>Step 1: Welcome to the installer!</div>;
      case 2:
        return <div>Step 2: Set up your environment variables.</div>;
      case 3:
        return <div>Step 3: Install dependencies.</div>;
      case 4:
        return <div>Step 4: Start the development server.</div>;
      default:
        return <div>Installation complete!</div>;
    }
  };

  return (
    <div>
      {renderStep()}
      <div>
        {step > 1 && <button onClick={prevStep}>Previous</button>}
        {step < 4 && <button onClick={nextStep}>Next</button>}
      </div>
    </div>
  );
};

export default Installer;
