import type { Realm } from "@/.graphclient";
import * as React from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import { grey } from "@mui/material/colors";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import { alpha } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { visuallyHidden } from "@mui/utils";
import { ListFilter, Trash } from "lucide-react";

import { Switch } from "@realms-world/ui";

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = "asc" | "desc";

function getComparator<Key extends keyof Pick<Realm, "id" | "name">>(
  order: Order,
  orderBy: Key,
): (a: Pick<Realm, "id" | "name">, b: Pick<Realm, "id" | "name">) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Pick<Realm, "id" | "name">;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "id",
    numeric: true,
    disablePadding: true,
    label: "Realm ID",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Name",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Pick<Realm, "id" | "name">,
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: keyof Pick<Realm, "id" | "name">;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler =
    (property: keyof Pick<Realm, "id" | "name">) =>
    (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        <TableCell
          sx={{ backgroundColor: "#4D4E46", color: "rgb(251, 225, 187)" }}
          padding="checkbox"
        >
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all realms",
            }}
          />
        </TableCell>
        {headCells.map((headCell, index) => (
          <TableCell
            key={headCell.id}
            sx={{
              backgroundColor: "#4D4E46",
              color: "rgb(251, 225, 187) !important",
              textTransform: "uppercase",
              fontWeight: "800",
            }}
            align={headCell.numeric && index != 0 ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
              sx={{
                color: "rgb(251, 225, 187) !important",
                ".MuiTableSortLabel-icon": { color: "white !important" },
              }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

interface EnhancedTableToolbarProps {
  numSelected: number;
}

function EnhancedTableToolbar(props: EnhancedTableToolbarProps) {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        minHeight: { xs: 40, sm: 40 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity,
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <div></div>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton /*onClick={() => setSelected([])}*/>
            <Trash color="white" />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <ListFilter />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

export default function RealmsTable({
  realms,
  selectedRealms,
  onSelectRealms,
}: {
  realms: Pick<Realm, "id" | "name">[];
  selectedRealms: readonly string[];
  onSelectRealms: (realms: readonly string[]) => void;
}) {
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] =
    React.useState<keyof Pick<Realm, "id" | "name">>("id");
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const rows: Pick<Realm, "id" | "name">[] = realms;

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Pick<Realm, "id" | "name">,
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.id);
      onSelectRealms(newSelected);
      return;
    }
    onSelectRealms([]);
  };

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    const selectedIndex = selectedRealms.indexOf(name);
    let newSelected: readonly string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedRealms, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedRealms.slice(1));
    } else if (selectedIndex === selectedRealms.length - 1) {
      newSelected = newSelected.concat(selectedRealms.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selectedRealms.slice(0, selectedIndex),
        selectedRealms.slice(selectedIndex + 1),
      );
    }

    onSelectRealms(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event: boolean) => {
    setDense(event);
  };

  const isSelected = (name: string) => selectedRealms.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      rows
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [order, orderBy, page, rowsPerPage, rows],
  );

  return (
    <Box sx={{ width: "100%" }}>
      <EnhancedTableToolbar numSelected={selectedRealms.length} />
      <TableContainer sx={{ maxHeight: { sm: 440 } }}>
        <Table
          stickyHeader
          //sx={{ minWidth: 450 }}
          aria-labelledby="tableTitle"
          size={dense ? "small" : "medium"}
        >
          <EnhancedTableHead
            numSelected={selectedRealms.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
          />
          <TableBody>
            {visibleRows.map((row, index) => {
              const isItemSelected = isSelected(row.id);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  onClick={(event) => handleClick(event, row.id)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.name}
                  selected={isItemSelected}
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
                      checked={isItemSelected}
                      inputProps={{
                        "aria-labelledby": labelId,
                      }}
                    />
                  </TableCell>
                  <TableCell
                    component="th"
                    id={labelId}
                    scope="row"
                    padding="none"
                    align="left"
                    className=""
                  >
                    <span className="text-bright-yellow">{row.id}</span>
                  </TableCell>
                  <TableCell align="left">
                    <span className="text-bright-yellow">{row.name}</span>
                  </TableCell>
                </TableRow>
              );
            })}
            {emptyRows > 0 && (
              <TableRow
                style={{
                  height: (dense ? 33 : 53) * emptyRows,
                }}
              >
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="flex justify-between">
        <FormControlLabel
          className="!sm:min-h-[25px] -top-20 [&>*]:!text-sm"
          control={
            <Switch
              checked={dense}
              onCheckedChange={(event) => handleChangeDense(event)}
              className="mr-2 w-[39px]"
            />
          }
          label="Dense view"
        />
        <TablePagination
          rowsPerPageOptions={[20]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          sx={{}}
          nextIconButtonProps={{
            sx: { "&.Mui-disabled": { color: `${grey[600]} !important` } },
          }}
          backIconButtonProps={{
            sx: { "&.Mui-disabled": { color: `${grey[600]} !important` } },
          }}
          className="!text-bright-yellow"
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </Box>
  );
}
