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
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface PersonalInfo {
  name: string;
  birth_date: string;
  age: number;
  address: string;
  phone?: string;
  email?: string;
  occupation: string;
  annual_income: number;
  marital_status: string;
  children?: number;
  home_ownership: string;
}

interface Policy {
  policy_id: string;
  product_type: string;
  premium_amount: number;
  coverage_amount?: number;
  start_date: string;
  status?: string;
  [key: string]: any;
}

interface CommunicationRecord {
  date: string;
  type: string;
  subject: string;
  notes: string;
}

interface Customer {
  customer_id?: string;
  personal_info: PersonalInfo;
  existing_policies: Policy[];
  communication_history?: CommunicationRecord[];
  risk_profile: string;
  customer_segment: string;
  lifetime_value: number;
}

const customerData: Record<string, Customer> = {
  "cust001": {
    "customer_id": "cust001",
    "personal_info": {
      "name": "Anna Müller",
      "birth_date": "1985-03-15",
      "age": 39,
      "address": "Hauptstraße 123, 10115 Berlin",
      "phone": "+49 30 12345678",
      "email": "anna.mueller@email.com",
      "occupation": "Software Engineer",
      "annual_income": 75000,
      "marital_status": "married",
      "children": 2,
      "home_ownership": "owner",
    },
    "existing_policies": [
      {
        "policy_id": "POL001",
        "product_type": "Car Insurance",
        "premium_amount": 85.30,
        "coverage_amount": 50000,
        "start_date": "2021-06-01",
        "status": "active",
        "vehicle": "BMW 3 Series, 2020",
      }
    ],
    "communication_history": [
      {
        "date": "2024-01-15",
        "type": "phone_call",
        "subject": "Policy renewal inquiry",
        "notes": "Customer asked about car insurance policy renewal and mentioned recently buying a house",
      },
      {
        "date": "2023-12-20",
        "type": "email",
        "subject": "Claim status inquiry",
        "notes": "Follow-up on minor car accident claim - settled successfully",
      },
      {
        "date": "2023-11-28",
        "type": "phone_call",
        "subject": "Home insurance inquiry",
        "notes": "Customer mentioned she already has home insurance with another provider when asked about our home insurance products",
      },
      {
        "date": "2023-10-05",
        "type": "phone_call",
        "subject": "Life insurance inquiry",
        "notes": "Customer expressed interest in life insurance after birth of second child but did not proceed",
      },
    ],
    "risk_profile": "low",
    "customer_segment": "premium",
    "lifetime_value": 15000,
  },
  "cust002": {
    "customer_id": "cust002",
    "personal_info": {
      "name": "Thomas Schmidt",
      "birth_date": "1975-08-22",
      "age": 49,
      "address": "Lindenallee 45, 20099 Hamburg",
      "phone": "+49 40 98765432",
      "email": "thomas.schmidt@email.com",
      "occupation": "Business Manager",
      "annual_income": 95000,
      "marital_status": "married",
      "children": 1,
      "home_ownership": "owner",
    },
    "existing_policies": [
      {
        "policy_id": "POL003",
        "product_type": "Life Insurance",
        "premium_amount": 150.00,
        "coverage_amount": 300000,
        "start_date": "2019-03-10",
        "status": "active",
        "type": "term_life",
      },
      {
        "policy_id": "POL004",
        "product_type": "Home Insurance",
        "premium_amount": 180.00,
        "coverage_amount": 400000,
        "start_date": "2020-07-15",
        "status": "active",
      },
    ],
    "communication_history": [
      {
        "date": "2024-02-10",
        "type": "email",
        "subject": "Policy review request",
        "notes": "Customer requested annual policy review and asked about investment products",
      },
      {
        "date": "2023-11-18",
        "type": "phone_call",
        "subject": "Claim notification",
        "notes": "Minor home damage claim due to storm - processed quickly",
      },
    ],
    "risk_profile": "low",
    "customer_segment": "premium",
    "lifetime_value": 25000,
  },
  "cust003": {
    "personal_info": {
      "name": "Lukas Weber",
      "birth_date": "1993-05-20",
      "age": 32,
      "address": "Leopoldstr. 55, 80802 München",
      "occupation": "IT Consultant",
      "annual_income": 85000,
      "marital_status": "single",
      "home_ownership": "renter",
    },
    "existing_policies": [
      {
        "policy_id": "POL005",
        "product_type": "Personal Liability Insurance",
        "premium_amount": 7.50,
        "start_date": "2022-01-10",
      },
      {
        "policy_id": "POL006",
        "product_type": "Legal Protection Insurance",
        "premium_amount": 25.00,
        "start_date": "2022-01-10",
      },
      {
        "policy_id": "POL007",
        "product_type": "Personal Cyber Insurance",
        "premium_amount": 12.00,
        "start_date": "2023-08-01",
      },
    ],
    "risk_profile": "low",
    "customer_segment": "young_professionals",
    "lifetime_value": 8000,
  },
  "cust004": {
    "personal_info": {
      "name": "Sophie Becker",
      "birth_date": "2004-02-12",
      "age": 21,
      "address": "Warschauer Str. 33, 10243 Berlin",
      "occupation": "Student",
      "annual_income": 12000,
      "marital_status": "single",
      "home_ownership": "renter",
    },
    "existing_policies": [
      {
        "policy_id": "POL008",
        "product_type": "Personal Liability Insurance",
        "premium_amount": 5.00,
        "start_date": "2023-10-01",
      },
      {
        "policy_id": "POL009",
        "product_type": "Rental Deposit Insurance",
        "premium_amount": 8.00,
        "start_date": "2023-10-01",
      },
    ],
    "risk_profile": "medium",
    "customer_segment": "students",
    "lifetime_value": 1500,
  },
  "cust005": {
    "personal_info": {
      "name": "Dr. Elias Roth",
      "birth_date": "1980-11-30",
      "age": 44,
      "address": "Goetheplatz 2, 60313 Frankfurt",
      "occupation": "Doctor",
      "annual_income": 150000,
      "marital_status": "married",
      "children": 2,
      "home_ownership": "owner",
    },
    "existing_policies": [
      {
        "policy_id": "POL010",
        "product_type": "Health Insurance",
        "premium_amount": 550.00,
        "start_date": "2010-04-15",
      },
      {
        "policy_id": "POL011",
        "product_type": "Business Insurance",
        "premium_amount": 120.00,
        "start_date": "2010-04-15",
      },
      {
        "policy_id": "POL012",
        "product_type": "Life Insurance",
        "premium_amount": 200.00,
        "coverage_amount": 750000,
        "start_date": "2015-06-20",
      },
      {
        "policy_id": "POL013",
        "product_type": "Home Insurance",
        "premium_amount": 250.00,
        "start_date": "2018-09-01",
      },
      {
        "policy_id": "POL014",
        "product_type": "Valuables Insurance",
        "premium_amount": 50.00,
        "start_date": "2021-03-10",
      },
    ],
    "risk_profile": "low",
    "customer_segment": "high_income",
    "lifetime_value": 85000,
  },
};

// Add more customers (truncated for brevity - in real implementation, include all 32 customers)

const getRiskProfileColor = (risk: string) => {
  switch (risk) {
    case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
};

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('de-DE', { 
    style: 'currency', 
    currency: 'EUR' 
  }).format(amount);
};

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('de-DE');
};

export const CustomerDataTable: React.FC = () => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRow = (customerId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(customerId)) {
      newExpanded.delete(customerId);
    } else {
      newExpanded.add(customerId);
    }
    setExpandedRows(newExpanded);
  };

  const customers = Object.entries(customerData);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Customer Data Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]"></TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Age</TableHead>
                <TableHead>Occupation</TableHead>
                <TableHead>Income</TableHead>
                <TableHead>Risk Profile</TableHead>
                <TableHead>Segment</TableHead>
                <TableHead>Lifetime Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map(([customerId, customer]) => (
                <React.Fragment key={customerId}>
                  <TableRow 
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => toggleRow(customerId)}
                  >
                    <TableCell>
                      {expandedRows.has(customerId) ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </TableCell>
                    <TableCell className="font-medium">{customer.personal_info.name}</TableCell>
                    <TableCell>{customer.personal_info.age}</TableCell>
                    <TableCell>{customer.personal_info.occupation}</TableCell>
                    <TableCell>{formatCurrency(customer.personal_info.annual_income)}</TableCell>
                    <TableCell>
                      <Badge className={getRiskProfileColor(customer.risk_profile)}>
                        {customer.risk_profile}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{customer.customer_segment}</Badge>
                    </TableCell>
                    <TableCell>{formatCurrency(customer.lifetime_value)}</TableCell>
                  </TableRow>
                  {expandedRows.has(customerId) && (
                    <TableRow>
                      <TableCell colSpan={8} className="p-0">
                        <div className="p-6 bg-muted/20">
                          <div className="grid gap-6 md:grid-cols-2">
                            <div>
                              <h4 className="font-semibold mb-3">Existing Policies</h4>
                              <div className="space-y-2">
                                {customer.existing_policies.map((policy) => (
                                  <div key={policy.policy_id} className="p-3 bg-background rounded border">
                                    <div className="flex justify-between items-start">
                                      <div>
                                        <p className="font-medium">{policy.product_type}</p>
                                        <p className="text-sm text-muted-foreground">
                                          Policy ID: {policy.policy_id}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                          Start: {formatDate(policy.start_date)}
                                        </p>
                                      </div>
                                      <div className="text-right">
                                        <p className="font-medium">{formatCurrency(policy.premium_amount)}/month</p>
                                        {policy.coverage_amount && (
                                          <p className="text-sm text-muted-foreground">
                                            Coverage: {formatCurrency(policy.coverage_amount)}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <h4 className="font-semibold mb-3">Communication History</h4>
                              <div className="space-y-2">
                                {customer.communication_history ? customer.communication_history.map((comm, index) => (
                                  <div key={index} className="p-3 bg-background rounded border">
                                    <div className="flex justify-between items-start mb-2">
                                      <p className="font-medium">{comm.subject}</p>
                                      <Badge variant="secondary" className="text-xs">
                                        {comm.type.replace('_', ' ')}
                                      </Badge>
                                    </div>
                                    <p className="text-sm text-muted-foreground mb-1">
                                      {formatDate(comm.date)}
                                    </p>
                                    <p className="text-sm">{comm.notes}</p>
                                  </div>
                                )) : (
                                  <p className="text-sm text-muted-foreground">No communication history available</p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
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