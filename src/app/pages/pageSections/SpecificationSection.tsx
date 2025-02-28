import { Box, Typography } from "@mui/material";
import { ProductSpecificationType } from "../../types/product";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
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
  marginRight = "40rem",
}: // displayHeader = true,
SpecificationSectionProps) => {
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
    <>
      <Box>
        <Typography variant="h6" sx={{ textTransform: "uppercase" }}>
          Product Specifications
        </Typography>
        <Accordion
          type="single"
          style={{ marginRight, marginLeft: "1rem" }}
          collapsible
        >
          {features.length ? (
            <SpecificationAccordionItem
              specifications={features}
              itemName="Features"
            />
          ) : null}
          {physical.length ? (
            <SpecificationAccordionItem
              specifications={physical}
              itemName="Physical Specifications"
            />
          ) : null}
          {technical.length ? (
            <SpecificationAccordionItem
              specifications={technical}
              itemName="Technical Specifications"
            />
          ) : null}
          {other.length ? (
            <SpecificationAccordionItem
              specifications={other}
              itemName="Other"
            />
          ) : null}
        </Accordion>
      </Box>
    </>
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
        <Table>
          <TableBody>
            {...specifications.map((feature) => (
              <SpecificationRow specification={feature} key={feature.name} />
            ))}
          </TableBody>
        </Table>
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
      <TableCell>{specification.name}</TableCell>
      <TableCell>{specification.value}</TableCell>
    </TableRow>
  );
};
