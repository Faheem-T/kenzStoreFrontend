import { Box, Button, TextField, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks";
import { SafeUserType } from "../types/user";
import { profileUpdated, selectUser } from "../features/auth/authSlice";
import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useUpdateUserProfileMutation } from "../api/userProfileApi";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";

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
    control,
    formState: { errors },
    handleSubmit,
  } = form;

  // reusable compontent
  const ProfileField = ({
    label,
    value,
    name,
  }: {
    label: string;
    value: string;
    name: keyof ProfileType;
  }) => {
    if (isEditing) {
      return (
        <Box>
          <TextField
            {...register(name)}
            label={label}
            variant="standard"
            error={!!errors[name]}
            helperText={errors[name]?.message}
            // type={name === "DOB" ? "date" : "text"}
          />
        </Box>
      );
    }
    if (!value) return null;
    return (
      <Box>
        <Typography variant="caption" color="textDisabled">
          {label}
        </Typography>
        <Typography>{value}</Typography>
      </Box>
    );
  };

  const submitHandler = async (data: ProfileType) => {
    const { data: updateResponse, error } =
      await createUpdateUserProfileMutation({
        body: data,
        userId: user._id,
      });
    if (!updateResponse) {
      toast.error("Failed to update profile");
      return;
    }
    const { email, firstName, lastName } = updateResponse.data;
    dispatch(profileUpdated({ email, firstName, lastName }));
    // if (updateResponse) {
    //   dispatch(
    //     profileUpdated({
    //       ...updateResponse,
    //     })
    //   );
    // }
    if (!error) {
      toast.success("Profile updated successfully");
      setIsEditing(false);
    }
  };

  return (
    <>
      <Box sx={{ px: 12, py: 4 }}>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(submitHandler)}
          bgcolor="background.paper"
          sx={{ p: 2, boxShadow: 24 }}
        >
          <ProfileField
            label="First Name"
            value={user.firstName}
            name="firstName"
          />
          <ProfileField
            label="Last Name"
            value={user.lastName || ""}
            name="lastName"
          />
          <ProfileField label="Email" value={user.email} name="email" />
          {/* <ProfileField
            label="Date of Birth"
            value={user.DOB?.toDateString() ?? ""}
            name="DOB"
          /> */}
          <Box
            sx={{ display: "flex", gap: 2, mt: 2, justifyContent: "center" }}
          >
            {/* Edit / Save / Cancel Buttons */}
            {isEditing ? (
              <>
                <Button variant="contained" type="submit">
                  Save
                </Button>
                <Button onClick={() => setIsEditing(false)}>Cancel</Button>
              </>
            ) : (
              <Button
                variant="contained"
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
      </Box>
    </>
  );
};
