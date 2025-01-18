import {
  useBlockUserMutation,
  useGetUsersQuery,
} from "@/app/api/userManagementApi";
import { LoadingComponent } from "@/app/components/LoadingComponent";
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Check } from "@mui/icons-material";
import { Box, Switch, Typography } from "@mui/material";
import toast from "react-hot-toast";

export const AdminUsersOverviewPage = () => {
  const { data, isLoading } = useGetUsersQuery();
  const [createBlockUserMutation, { isLoading: isBlocking }] =
    useBlockUserMutation();

  if (isLoading) return <LoadingComponent fullScreen />;
  if (!data) return <Box>Users not found!</Box>;

  const users = data.data;

  const handleBlockUserToggle = async (userId: string) => {
    const { data, error } = await createBlockUserMutation(userId);
    if (data?.success) toast.success(data.message);
    else toast.error((error as any)?.data?.message);
  };

  return (
    <>
      <Box sx={{ width: "100%", px: 12 }}>
        <Box sx={{ display: "flex", justifyContent: "center", my: 5 }}>
          <Typography
            variant="h4"
            fontWeight={700}
            sx={{ textTransform: "uppercase" }}
          >
            Users Overview
          </Typography>
        </Box>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>First Name</TableHead>
              <TableHead>Last Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead>Blocked</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {...users.map((user) => (
              <TableRow
                className={cn(
                  "hover:bg-accent cursor-pointer",
                  "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                )}
              >
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.isVerified ? <Check /> : null}</TableCell>
                <TableCell>
                  {
                    <Switch
                      checked={user.isBlocked}
                      disabled={isBlocking}
                      onChange={() => handleBlockUserToggle(user._id)}
                    />
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </>
  );
};
