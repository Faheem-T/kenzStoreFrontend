import { Box, Button, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks";
import { SafeUserType } from "../types/user";
import { profileUpdated, selectUser } from "../features/auth/authSlice";
import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateUserProfileMutation } from "../api/userProfileApi";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditableField } from "../components/EditableField";
import { User } from "lucide-react";

const ProfileSchema = z.object({
  firstName: z.string().nonempty("First name is required"),
  lastName: z.string().optional(),
  email: z.string().email("Please enter a valid email"),
  //   DOB: z.date().optional(),
});

type ProfileType = z.infer<typeof ProfileSchema>;

export const UserProfilePage = () => {
  const user = useAppSelector(selectUser) as SafeUserType;

  const dispatch = useAppDispatch();

  console.log(user);
  const [isEditing, setIsEditing] = useState(false);

  const [createUpdateUserProfileMutation, { isLoading }] =
    useUpdateUserProfileMutation();

  const form = useForm<ProfileType>({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      //   DOB: user.DOB,
    },
    resolver: zodResolver(ProfileSchema),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = form;

  const submitHandler = async (data: ProfileType) => {
    const { data: updateResponse, error } =
      await createUpdateUserProfileMutation({
        body: data,
        userId: user._id,
      });
    if (!updateResponse?.data) {
      toast.error("Failed to update profile");
      return;
    }
    const { email, firstName, lastName } = updateResponse.data;
    dispatch(profileUpdated({ email, firstName, lastName }));
    if (!error) {
      toast.success("Profile updated successfully");
      setIsEditing(false);
    }
  };

  return (
    <>
      <Stack sx={{ p: 4 }} gap={2}>
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <User size={40} />
          <Typography variant="h5">Your Details</Typography>
        </Box>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(submitHandler)}
          bgcolor="background.paper"
          sx={{ p: 2, boxShadow: 2 }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                gap: 2,
                // mt: 2,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* Edit / Save / Cancel Buttons */}
              {isEditing ? (
                <>
                  <Button
                    size="small"
                    variant="text"
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving..." : "Save"}
                  </Button>
                  <Button
                    size="small"
                    variant="text"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  size="small"
                  variant="text"
                  onClick={(e) => {
                    e.preventDefault();
                    setIsEditing(true);
                  }}
                >
                  Edit
                </Button>
              )}
            </Box>
          </Box>
          <EditableField
            label="First Name"
            value={user.firstName}
            name="firstName"
            errors={errors}
            register={register}
            isEditing={isEditing}
          />
          <EditableField
            label="Last Name"
            value={user.lastName || ""}
            name="lastName"
            errors={errors}
            register={register}
            isEditing={isEditing}
          />
          <EditableField
            label="Email"
            value={user.email}
            name="email"
            errors={errors}
            register={register}
            isEditing={isEditing}
          />
          {/* <ProfileField
            label="Date of Birth"
            value={user.DOB?.toDateString() ?? ""}
            name="DOB"
          /> */}
        </Box>
        <Box sx={{ boxShadow: 2, bgcolor: "background.paper", p: 2 }}>
          <Typography>Your Referral Code</Typography>
          <Typography
            sx={{
              fontWeight: "bold",
              textAlign: "center",
              my: 2,
              fontSize: "1.5rem",
            }}
          >
            {user.referralCode}
          </Typography>
          <Typography variant="caption" color="textDisabled">
            Get other users to register with this code to win upto ₹200!
          </Typography>
        </Box>
      </Stack>
    </>
  );
};
