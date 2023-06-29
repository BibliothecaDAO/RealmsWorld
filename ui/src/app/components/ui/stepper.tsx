"use client";
import { Step, StepLabel, Stepper as MuiStepper } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { blue, lightBlue, blueGrey } from "@mui/material/colors";

export interface StepperProps {
  children: React.ReactNode;
}
export const StepperTheme: React.FC<StepperProps> = ({
  children,
}: StepperProps) => {
  const theme = createTheme({
    components: {
      MuiStep: {
        styleOverrides: {
          root: {
            ".MuiSvgIcon-root": {
              color: blueGrey,
              fontSize: "32px",
              "&.Mui-completed, &.Mui-active": {
                color: blueGrey,
              },
            },
          },
        },
      },
      MuiStepConnector: {
        styleOverrides: {
          root: {
            top: "15px",
          },
          line: {
            borderColor: blueGrey[500],
            width: "80%",
            margin: "auto",
          },
        },
      },
      MuiStepLabel: {
        styleOverrides: {
          label: {
            "&.MuiStepLabel-alternativeLabel": {
              marginTop: "8px",
              fontWeight: "900",
              color: "white",
            },
          },
        },
      },
    },
  });
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

const Stepper = ({
  steps,
  activeStep,
}: {
  steps?: any;
  activeStep?: number;
}) => {
  return (
    <StepperTheme>
      <div className="w-full">
        <MuiStepper alternativeLabel activeStep={activeStep}>
          {steps.map((label: string, index: number) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </MuiStepper>
      </div>
    </StepperTheme>
  );
};

export default Stepper;
