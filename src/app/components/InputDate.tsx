import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";

export const InputDate = ({
  name,
  label,
  control,
}: {
  name: string;
  label: string;
  control: any;
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <DatePicker
          label={label}
          value={value ? dayjs(value) : null}
          onChange={(newValue) => {
            onChange(newValue?.toDate());
          }}
          slotProps={{
            textField: {
              helperText: error?.message,
              error: !!error,
              variant: "standard",
            },
          }}
        />
      )}
    />
  );
};
