import type { Meta, StoryObj } from "@storybook/react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import { Button } from "./button";
import { Checkbox } from "./checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

const meta: Meta<typeof Dialog> = {
  title: "ui/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  argTypes: {},
};
export default meta;

type Story = StoryObj<typeof Dialog>;
export const Base: Story = {
  render: (args) => (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="self-center" size={"lg"} variant={"outline"}>
          Click Me
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogTitle>
          <h2>This is a dialog title</h2>
        </DialogTitle>
        <DialogHeader>
          <p>This is a dialog header</p>
        </DialogHeader>
        <DialogDescription>
          <p>This is a dialog description</p>
        </DialogDescription>
        <DialogFooter>
          <p>This is a dialog footer</p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  args: {},
};

export const DialogWithTableContent: Story = {
  render: (args) => (
    <div className="bg-dark-green font-sans-serif text-bright-yellow">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="self-center" size={"lg"} variant={"outline"}>
            Stake Realms
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-full w-full sm:!max-h-[720px]">
          <DialogHeader>
            <h6 className="my-0 py-0 font-sans-serif text-bright-yellow">
              Board the Ship
            </h6>
          </DialogHeader>
          <Box sx={{ width: "100%" }}>
            <TableContainer sx={{ maxHeight: { sm: 440 } }}>
              <Table stickyHeader aria-labelledby="tableTitle" size={"medium"}>
                <TableBody>
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={"test"}
                    sx={{
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: `rgba(158,158,158, 0.4) !important`,
                      },
                      "&.Mui-selected": {
                        backgroundColor: `rgba(158,158,158, 0.25) !important`,
                        "&:hover": {
                          backgroundColor: `rgba(158,158,158, 0.4) !important`,
                        },
                      },
                    }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        className="!text-bright-yellow"
                      />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={"1"}
                      scope="row"
                      padding="none"
                      align="left"
                      className=""
                    >
                      <span className="text-bright-yellow">{1}</span>
                    </TableCell>
                    <TableCell align="left">
                      <span className="text-bright-yellow">{"test"}</span>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  ),
  args: {},
};
