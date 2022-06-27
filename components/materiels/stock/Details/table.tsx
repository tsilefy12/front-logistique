import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import TableHead from '@mui/material/TableHead';

interface TablePaginationActionsProps {
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
      event: React.MouseEvent<HTMLButtonElement>,
      newPage: number,
    ) => void;
}


function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;
  
    const handleFirstPageButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>,
    ) => {
      onPageChange(event, 0);
    };
  
    const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, page - 1);
    };
  
    const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, page + 1);
    };
  
    const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };
  
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="next page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="last page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }


  function createData(numero: string, designation: string, dateDebutStock: string) {
    return { numero, designation, dateDebutStock };
  }

  const rows = [
    createData('XX 00 005', 'designation_1', '12/02/2022'),
    createData('XX 00 006', 'designation_2', '12/02/2022'),
    createData('XX 00 007', 'designation_3', '12/02/2022'),
    createData('XX 00 008', 'designation_4', '12/02/2022'),
    createData('XX 00 009', 'designation_5', '12/02/2022'),
    createData('XX 00 0010', 'designation_6', '12/02/2022'),
    createData('XX 00 0011', 'designation_7', '12/02/2022'),
    createData('XX 00 0012', 'designation_8', '12/02/2022'),
    createData('XX 00 0013', 'designation_9', '12/02/2022'),
  ]

export default function TableDetailStock(){
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
      page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  
    const handleChangePage = (
      event: React.MouseEvent<HTMLButtonElement> | null,
      newPage: number,
    ) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
    };
  
    return (
        <Grid
            container
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            sx={{
                mt : 2
            }}
        >
            <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                <Typography variant="h4" gutterBottom component="div">
                    Détails de stock par type
                </Typography>
                <TextField
                    fullWidth
                    id="standard-bare"
                    variant="outlined"
                    placeholder="Recherche"
                    size="small"
                    InputProps={{
                    endAdornment: (
                        <IconButton>
                            <SearchOutlinedIcon/> 
                        </IconButton>
                    ),
                    }}
                    sx={{
                        ml : 40,
                        width : '40%'
                    }}
              />

            </Grid>
            <Card sx={{ mt : 2 ,minWidth: 275 }}>
                <CardContent>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 1000 }} aria-label="custom pagination table">
                    <TableHead>
                        <TableRow>
                                <TableCell>N° OPTIM</TableCell>
                                <TableCell align="right">Désignation</TableCell>
                                <TableCell align="right">Date début de stock</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {(rowsPerPage > 0
                            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : rows
                        ).map((row) => (
                            <TableRow key={row.numero}>
                            <TableCell component="th" scope="row">
                                {row.numero}
                            </TableCell>
                            <TableCell  align="right">
                                {row.designation}
                            </TableCell>
                            <TableCell  align="right">
                                {row.dateDebutStock}
                            </TableCell>
                            </TableRow>
                        ))}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                    </Table>
                </TableContainer>
                </CardContent>
            </Card>
        </Grid>
    )
}