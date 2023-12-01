"use client";

import React from "react";
import { Stepper as MuiStepper, Step, StepLabel } from "@mui/material";
import { blue, blueGrey, lightBlue } from "@mui/material/colors";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import PropTypes from "prop-types";

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
              color: "#4D4E46",
              fontSize: "32px",

              "&.Mui-completed, &.Mui-active": {
                color: "#FBE1BB",
              },
              ".MuiStepIcon-text": {
                fill: blueGrey,
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
              color: "#FBE1BB",
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
