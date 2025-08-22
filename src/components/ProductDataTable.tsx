import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronDownIcon, ChevronRightIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Product {
  product_id: string;
  name: string;
  description: string;
  target_segments: string[];
  [key: string]: any;
}

const productData: { [key: string]: Product } = {
  life_insurance: {
    product_id: "LIFE001",
    name: "SecureLife Premium",
    description: "Comprehensive life insurance with flexible coverage options",
    min_coverage: 50000,
    max_coverage: 1000000,
    age_range: { min: 18, max: 70 },
    base_premium_rate: 0.8,
    features: [
      "Term and whole life options",
      "Accidental death benefit",
      "Disability waiver of premium",
      "Cash value accumulation (whole life)",
    ],
    target_segments: ["families", "high_income", "business_owners"],
  },
  health_insurance: {
    product_id: "HEALTH001",
    name: "HealthGuard Plus",
    description: "Comprehensive health insurance with extensive coverage",
    monthly_premium_range: { min: 180, max: 600 },
    age_range: { min: 18, max: 75 },
    features: [
      "Hospitalization coverage",
      "Outpatient treatment",
      "Prescription drugs",
      "Preventive care",
      "Dental and vision add-ons available",
    ],
    target_segments: ["families", "self_employed", "premium"],
  },
  car_insurance: {
    product_id: "AUTO001",
    name: "DriveSecure Comprehensive",
    description: "Full coverage auto insurance with competitive rates",
    coverage_types: [
      "Liability",
      "Collision",
      "Comprehensive",
      "Uninsured motorist",
    ],
    discount_factors: [
      "Safe driver discount (up to 25%)",
      "Multi-policy discount (15%)",
      "Anti-theft device discount (5%)",
      "Good student discount (10%)",
    ],
    average_premium_range: { min: 60, max: 200 },
    target_segments: ["all_drivers", "families", "young_professionals"],
  },
  home_insurance: {
    product_id: "HOME001",
    name: "HomeShield Complete",
    description: "Comprehensive home insurance protecting property and belongings",
    coverage_types: [
      "Dwelling",
      "Personal property",
      "Liability",
      "Additional living expenses",
    ],
    premium_factors: [
      "Property value",
      "Location",
      "Construction type",
      "Security features",
    ],
    average_premium_range: { min: 80, max: 300 },
    target_segments: ["homeowners", "premium", "families"],
  },
  travel_insurance: {
    product_id: "TRAVEL001",
    name: "TravelSafe International",
    description: "Travel insurance for domestic and international trips",
    coverage_options: [
      "Trip cancellation/interruption",
      "Medical emergencies abroad",
      "Lost/delayed baggage",
      "Emergency evacuation",
    ],
    premium_range: { per_day: { min: 2, max: 15 } },
    trip_duration_max: 365,
    target_segments: ["frequent_travelers", "families", "business_travelers"],
  },
  disability_insurance: {
    product_id: "DISABILITY001",
    name: "IncomeProtect",
    description: "Disability insurance to protect income in case of inability to work",
    coverage_percentage: { min: 60, max: 80 },
    benefit_period_options: ["2 years", "5 years", "until retirement"],
    waiting_period_options: [30, 90, 180, 365],
    target_segments: ["high_income", "professionals", "skilled_workers"],
  },
  business_insurance: {
    product_id: "BUSINESS001",
    name: "BusinessGuard Pro",
    description: "Comprehensive business insurance for small to medium enterprises",
    coverage_types: [
      "General liability",
      "Property",
      "Business interruption",
      "Cyber liability",
    ],
    target_segments: ["business_owners", "self_employed", "professionals"],
  },
  personal_liability_insurance: {
    product_id: "LIABILITY001",
    name: "PrivatSchutz Sorglos",
    description: "Essential personal liability insurance covering damages to third parties.",
    min_coverage: 5000000,
    max_coverage: 50000000,
    average_premium_range: { min: 5, max: 15 },
    features: [
      "Coverage for personal injury and property damage",
      "Loss of keys coverage",
      "Worldwide coverage"
    ],
    target_segments: ["all_drivers", "families", "young_professionals", "homeowners", "students"],
  },
  legal_protection_insurance: {
    product_id: "LEGAL001",
    name: "RechtSicher Privat",
    description: "Comprehensive legal protection for private, professional, and traffic-related disputes.",
    coverage_areas: ["Private life", "Work", "Traffic", "Housing"],
    average_premium_range: { min: 15, max: 40 },
    features: [
      "Free initial legal consultation",
      "Mediation services",
      "Choice of own lawyer"
    ],
    target_segments: ["families", "professionals", "all_drivers", "homeowners"],
  },
  pet_insurance: {
    product_id: "PET001",
    name: "TierGesundheit Premium",
    description: "Health insurance for your pets, covering vet bills for surgeries and treatments.",
    pet_types_covered: ["dog", "cat"],
    coverage_options: ["Surgery only", "Full coverage including outpatient care"],
    average_premium_range: { min: 20, max: 80 },
    features: [
      "Direct billing with vets",
      "Preventive care allowance",
      "Coverage for hereditary conditions"
    ],
    target_segments: ["families", "pet_owners"],
  },
  motorcycle_insurance: {
    product_id: "MOTO001",
    name: "ZweiradSicher",
    description: "Specialized insurance for motorcycles, scooters, and mopeds.",
    coverage_types: ["Liability", "Partial cover", "Fully comprehensive"],
    discount_factors: [
      "Garage parking",
      "Seasonal license plate",
      "Experienced rider discount"
    ],
    average_premium_range: { min: 20, max: 150 },
    target_segments: ["all_drivers", "young_professionals"],
  },
  electronics_insurance: {
    product_id: "ELEC001",
    name: "GadgetGarant",
    description: "Protection for your valuable electronics like smartphones, laptops, and cameras.",
    covered_perils: ["Accidental damage", "Liquid damage", "Theft", "Short circuit"],
    device_age_max: 24,
    premium_factors: ["Device value", "Coverage scope"],
    target_segments: ["students", "young_professionals", "families", "frequent_travelers"],
  },
  valuables_insurance: {
    product_id: "VALUABLES001",
    name: "WertgegenstandTresor",
    description: "Specialized insurance for high-value items like jewelry, art, and musical instruments.",
    covered_items: [
      "Jewelry & Watches",
      "Art & Antiques",
      "Musical Instruments",
      "Designer Handbags"
    ],
    coverage_basis: "Agreed value",
    features: [
      "Worldwide all-risk coverage",
      "No deductible option",
      "Coverage during transit"
    ],
    target_segments: ["high_income", "premium", "professionals"],
  },
  rental_deposit_insurance: {
    product_id: "RENTAL001",
    name: "Kautionsfrei Wohnen",
    description: "An alternative to a cash rental deposit (Mietkaution), providing a guarantee to your landlord.",
    annual_premium_rate: { percentage_of_deposit: { min: 3.5, max: 5.0 } },
    max_deposit_amount: 15000,
    features: [
      "Frees up cash",
      "Quick and easy online application",
      "Accepted by most landlords"
    ],
    target_segments: ["students", "young_professionals", "families"],
  },
  personal_cyber_insurance: {
    product_id: "CYBER001",
    name: "CyberSafe Home",
    description: "Protection against online risks such as identity theft, cyberbullying, and online shopping fraud.",
    coverage_types: [
      "Data recovery costs",
      "Online account fraud",
      "Identity theft recovery",
      "Legal costs for reputation damage",
    ],
    average_premium_range: { min: 8, max: 25 },
    features: [
      "24/7 support hotline",
      "Psychological support after cyberbullying",
      "Proactive security advice"
    ],
    target_segments: ["families", "high_income", "professionals", "students"],
  },
};

const ProductDataTable: React.FC = () => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
    }).format(amount);
  };

  const formatRange = (range: { min: number; max: number }, isCurrency = false): string => {
    if (isCurrency) {
      return `${formatCurrency(range.min)} - ${formatCurrency(range.max)}`;
    }
    return `${range.min} - ${range.max}`;
  };

  const toggleRow = (productKey: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(productKey)) {
      newExpanded.delete(productKey);
    } else {
      newExpanded.add(productKey);
    }
    setExpandedRows(newExpanded);
  };

  const renderProductDetails = (productKey: string, product: Product) => {
    const details = [];

    // Coverage/Premium Information
    if (product.min_coverage && product.max_coverage) {
      details.push({
        label: "Versicherungssumme",
        value: `${formatCurrency(product.min_coverage)} - ${formatCurrency(product.max_coverage)}`
      });
    }
    
    if (product.average_premium_range) {
      details.push({
        label: "Durchschnittsprämie (monatlich)",
        value: formatRange(product.average_premium_range, true)
      });
    }
    
    if (product.monthly_premium_range) {
      details.push({
        label: "Monatsprämie",
        value: formatRange(product.monthly_premium_range, true)
      });
    }

    if (product.age_range) {
      details.push({
        label: "Altersbereich",
        value: `${product.age_range.min} - ${product.age_range.max} Jahre`
      });
    }

    return (
      <div className="p-4 border-t bg-muted/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Details */}
          {details.length > 0 && (
            <div>
              <h4 className="font-semibold mb-3 text-foreground">Details</h4>
              <div className="space-y-2">
                {details.map((detail, index) => (
                  <div key={index} className="flex justify-between">
                    <span className="text-muted-foreground">{detail.label}:</span>
                    <span className="font-medium">{detail.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Features */}
          {product.features && (
            <div>
              <h4 className="font-semibold mb-3 text-foreground">Leistungen</h4>
              <ul className="space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start">
                    <span className="mr-2">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Coverage Types */}
          {product.coverage_types && (
            <div>
              <h4 className="font-semibold mb-3 text-foreground">Versicherungsarten</h4>
              <div className="flex flex-wrap gap-2">
                {product.coverage_types.map((type, index) => (
                  <Badge key={index} variant="secondary">{type}</Badge>
                ))}
              </div>
            </div>
          )}

          {/* Coverage Options */}
          {product.coverage_options && (
            <div>
              <h4 className="font-semibold mb-3 text-foreground">Versicherungsoptionen</h4>
              <div className="flex flex-wrap gap-2">
                {product.coverage_options.map((option, index) => (
                  <Badge key={index} variant="secondary">{option}</Badge>
                ))}
              </div>
            </div>
          )}

          {/* Discount Factors */}
          {product.discount_factors && (
            <div>
              <h4 className="font-semibold mb-3 text-foreground">Rabattmöglichkeiten</h4>
              <ul className="space-y-1">
                {product.discount_factors.map((factor, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start">
                    <span className="mr-2">•</span>
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Coverage Areas */}
          {product.coverage_areas && (
            <div>
              <h4 className="font-semibold mb-3 text-foreground">Versicherungsbereiche</h4>
              <div className="flex flex-wrap gap-2">
                {product.coverage_areas.map((area, index) => (
                  <Badge key={index} variant="secondary">{area}</Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Produktdaten</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Produkt-ID</TableHead>
                <TableHead>Produktname</TableHead>
                <TableHead>Beschreibung</TableHead>
                <TableHead>Zielgruppen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(productData).map(([productKey, product]) => (
                <React.Fragment key={productKey}>
                  <TableRow 
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => toggleRow(productKey)}
                  >
                    <TableCell>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        {expandedRows.has(productKey) ? (
                          <ChevronDownIcon className="h-4 w-4" />
                        ) : (
                          <ChevronRightIcon className="h-4 w-4" />
                        )}
                      </Button>
                    </TableCell>
                    <TableCell className="font-medium">{product.product_id}</TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="max-w-xs truncate text-muted-foreground">
                      {product.description}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {product.target_segments.slice(0, 2).map((segment, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {segment}
                          </Badge>
                        ))}
                        {product.target_segments.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{product.target_segments.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                  {expandedRows.has(productKey) && (
                    <TableRow>
                      <TableCell colSpan={5} className="p-0">
                        {renderProductDetails(productKey, product)}
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductDataTable;