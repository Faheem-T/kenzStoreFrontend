import { Pagination, SxProps } from "@mui/material";

export const Paginator = ({
  currentPage,
  setPage,
  totalPages,
  disabled = false,
  sx,
}: {
  currentPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
  disabled?: boolean;
  sx?: SxProps;
}) => {
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    if (value < 0 || value > totalPages) return;
    setPage(value);
  };

  return (
    <Pagination
      sx={{ alignSelf: "center", ...sx }}
      disabled={disabled}
      color="primary"
      page={currentPage}
      count={totalPages}
      onChange={handlePageChange}
    />
  );
};
