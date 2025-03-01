import { Box, Typography, Grid2 as Grid } from "@mui/material";
import { ProductSpecificationType } from "../../types/product";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
interface SpecificationSectionProps {
  specifications: ProductSpecificationType[];
  marginRight?: string;
  // displayHeader?: boolean;
}

export const SpecificationSection = ({
  specifications,
}: SpecificationSectionProps) => {
  const features: ProductSpecificationType[] = [];
  const physical: ProductSpecificationType[] = [];
  const technical: ProductSpecificationType[] = [];
  const other: ProductSpecificationType[] = [];

  specifications.forEach((s) => {
    switch (s.category) {
      case "feature":
        features.push(s);
        break;
      case "physical":
        physical.push(s);
        break;
      case "technical":
        technical.push(s);
        break;
      default:
        other.push(s);
    }
  });

  return (
    <Box sx={{ px: { xs: 2, sm: 4, md: 6, lg: 12 } }}>
      <Typography variant="h6" sx={{ textTransform: "uppercase", mb: 2 }}>
        Product Specifications
      </Typography>
      <Accordion type="single" collapsible>
        {features.length > 0 && (
          <SpecificationAccordionItem
            specifications={features}
            itemName="Features"
          />
        )}
        {physical.length > 0 && (
          <SpecificationAccordionItem
            specifications={physical}
            itemName="Physical Specifications"
          />
        )}
        {technical.length > 0 && (
          <SpecificationAccordionItem
            specifications={technical}
            itemName="Technical Specifications"
          />
        )}
        {other.length > 0 && (
          <SpecificationAccordionItem specifications={other} itemName="Other" />
        )}
      </Accordion>
    </Box>
  );
};

interface SpecificationAccordionItemProps {
  specifications: ProductSpecificationType[];
  itemName: string;
}

const SpecificationAccordionItem = ({
  specifications,
  itemName,
}: SpecificationAccordionItemProps) => {
  return (
    <AccordionItem value={itemName}>
      <AccordionTrigger>
        <Typography variant="body1" sx={{ textTransform: "uppercase" }}>
          {itemName}
        </Typography>
      </AccordionTrigger>
      <AccordionContent>
        <Grid container spacing={2}>
          {specifications.map((feature) => (
            <Grid size={{ xs: 12, sm: 6 }} key={feature.name}>
              <SpecificationRow specification={feature} />
            </Grid>
          ))}
        </Grid>
      </AccordionContent>
    </AccordionItem>
  );
};

interface SpecificationRowProps {
  specification: ProductSpecificationType;
}

const SpecificationRow = ({ specification }: SpecificationRowProps) => {
  return (
    <TableRow>
      <TableCell className="font-bold">{specification.name}</TableCell>
      <TableCell>{specification.value}</TableCell>
    </TableRow>
  );
};
