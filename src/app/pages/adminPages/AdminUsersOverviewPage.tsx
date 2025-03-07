import {
  useBlockUserMutation,
  useGetUsersQuery,
  usePurgeUserMutation,
} from "@/app/api/userManagementApi";
import LoadingComponent from "@/app/components/LoadingComponent";
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
import { Box, Button, Switch, Typography } from "@mui/material";
import toast from "react-hot-toast";

const AdminUsersOverviewPage = () => {
  const { data, isLoading } = useGetUsersQuery();
  const [createBlockUserMutation, { isLoading: isBlocking }] =
    useBlockUserMutation();
  const [purgeUser, { isLoading: isPurging }] = usePurgeUserMutation();

  if (isLoading) return <LoadingComponent fullScreen />;
  if (!data) return <Box>Users not found!</Box>;

  const users = data.data;

  const handleBlockUserToggle = async (userId: string) => {
    const { data, error } = await createBlockUserMutation(userId);
    if (data?.success) toast.success(data.message);
    else toast.error((error as any)?.data?.message);
  };

  const handlePurgeUser = async (userId: string) => {
    await purgeUser(userId);
    toast.success("User has been purged successfully");
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
              <TableHead>Name</TableHead>
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
                <TableCell>{user.name}</TableCell>
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
                <TableCell>
                  <Button
                    onClick={() => handlePurgeUser(user._id)}
                    disabled={isPurging}
                  >
                    Purge User
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </>
  );
};
export default AdminUsersOverviewPage;
