
"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ListFilter, Award } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CertificationCard from "@/components/dashboard/certifications/CertificationCard";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

const allCertifications = [
    // IT & Cloud Computing
    {
        id: "aws-solutions-architect-associate",
        title: "AWS Certified Solutions Architect - Associate",
        provider: "Amazon Web Services",
        level: "Associate",
        domain: "IT & Cloud Computing",
        tags: ["AWS", "Cloud", "Architecture"],
        link: "https://aws.amazon.com/certification/certified-solutions-architect-associate/"
    },
    {
        id: "gcp-professional-cloud-architect",
        title: "Google Certified Professional Cloud Architect",
        provider: "Google Cloud",
        level: "Professional",
        domain: "IT & Cloud Computing",
        tags: ["GCP", "Cloud", "Professional"],
        link: "https://cloud.google.com/certification/cloud-architect"
    },
    {
        id: "azure-administrator-associate",
        title: "Microsoft Certified: Azure Administrator Associate",
        provider: "Microsoft",
        level: "Associate",
        domain: "IT & Cloud Computing",
        tags: ["Azure", "Microsoft", "Admin"],
        link: "https://learn.microsoft.com/en-us/certifications/azure-administrator/"
    },
    // Cybersecurity
    {
        id: "cissp",
        title: "Certified Information Systems Security Professional (CISSP)",
        provider: "(ISC)²",
        level: "Advanced",
        domain: "Cybersecurity",
        tags: ["Security", "CISSP", "Cybersecurity"],
        link: "https://www.isc2.org/Certifications/CISSP"
    },
    {
        id: "ceh",
        title: "Certified Ethical Hacker (CEH)",
        provider: "EC-Council",
        level: "Professional",
        domain: "Cybersecurity",
        tags: ["Security", "Hacking", "Ethical"],
        link: "https://www.eccouncil.org/programs/certified-ethical-hacker-ceh/"
    },
    {
        id: "comptia-security-plus",
        title: "CompTIA Security+",
        provider: "CompTIA",
        level: "Fundamental",
        domain: "Cybersecurity",
        tags: ["Security", "CompTIA"],
        link: "https://www.comptia.org/certifications/security"
    },
    // Project Management
    {
        id: "pmp",
        title: "Project Management Professional (PMP)",
        provider: "PMI",
        level: "Professional",
        domain: "Project Management",
        tags: ["PMP", "Management", "Agile"],
        link: "https://www.pmi.org/certifications/project-management-pmp"
    },
    // Agile & Scrum
    {
        id: "csm",
        title: "Certified ScrumMaster (CSM)",
        provider: "Scrum Alliance",
        level: "Fundamental",
        domain: "Agile & Scrum",
        tags: ["Scrum", "Agile", "CSM"],
        link: "https://www.scrumalliance.org/get-certified/scrum-master-certifications/csm"
    },
    // AI & Data Analytics
    {
        id: "google-data-analytics",
        title: "Google Data Analytics Professional Certificate",
        provider: "Google (Coursera)",
        level: "Fundamental",
        domain: "AI & Data Analytics",
        tags: ["Data", "Analytics", "Google"],
        link: "https://www.coursera.org/professional-certificates/google-data-analytics"
    },
    {
        id: "cap",
        title: "Certified Analytics Professional (CAP)",
        provider: "INFORMS",
        level: "Professional",
        domain: "AI & Data Analytics",
        tags: ["Analytics", "CAP", "Vendor-Neutral"],
        link: "https://www.informs.org/certification/cap-certification"
    },
    {
        id: "azure-ai-engineer",
        title: "Microsoft Certified: Azure AI Engineer Associate",
        provider: "Microsoft",
        level: "Associate",
        domain: "AI & Data Analytics",
        tags: ["Azure", "AI", "Machine Learning"],
        link: "https://learn.microsoft.com/en-us/certifications/azure-ai-engineer/"
    },
     {
        id: "azure-data-scientist",
        title: "Microsoft Certified: Azure Data Scientist Associate",
        provider: "Microsoft",
        level: "Associate",
        domain: "AI & Data Analytics",
        tags: ["Azure", "Data Science", "ML"],
        link: "https://learn.microsoft.com/en-us/credentials/certifications/azure-data-scientist/"
    },
    {
        id: "aws-ai-practitioner",
        title: "AWS Certified AI Practitioner",
        provider: "Amazon Web Services",
        level: "Foundational",
        domain: "AI & Data Analytics",
        tags: ["AWS", "AI", "Generative AI"],
        link: "https://aws.amazon.com/certification/certified-ai-practitioner/"
    },
    // Business & Management
    {
        id: "cbap",
        title: "Certified Business Analysis Professional (CBAP)",
        provider: "IIBA",
        level: "Advanced",
        domain: "Business & Management",
        tags: ["Business Analysis", "CBAP"],
        link: "https://www.iiba.org/certification/iiba-certifications/cbap/"
    },
    {
        id: "cscp",
        title: "Certified Supply Chain Professional (CSCP)",
        provider: "ASCM",
        level: "Professional",
        domain: "Business & Management",
        tags: ["Supply Chain", "CSCP"],
        link: "https://www.ascm.org/certifications/cscp/"
    },
    {
        id: "cma",
        title: "Certified Management Accountant (CMA)",
        provider: "IMA",
        level: "Professional",
        domain: "Business & Management",
        tags: ["Accounting", "Finance", "Management"],
        link: "https://www.imanet.org/cma-certification"
    },
    // DevOps & SRE
    {
        id: "cka",
        title: "Certified Kubernetes Administrator (CKA)",
        provider: "CNCF",
        level: "Professional",
        domain: "DevOps & SRE",
        tags: ["Kubernetes", "DevOps", "CKA"],
        link: "https://www.cncf.io/certification/cka/"
    },
    {
        id: "azure-devops-expert",
        title: "Microsoft Certified: DevOps Engineer Expert",
        provider: "Microsoft",
        level: "Expert",
        domain: "DevOps & SRE",
        tags: ["Azure", "DevOps", "CI/CD"],
        link: "https://learn.microsoft.com/en-us/certifications/devops-engineer/"
    },
    {
        id: "terraform-associate",
        title: "HashiCorp Certified: Terraform Associate",
        provider: "HashiCorp",
        level: "Associate",
        domain: "DevOps & SRE",
        tags: ["Terraform", "IaC", "DevOps"],
        link: "https://www.hashicorp.com/certification/terraform-associate"
    },
    // Web Development
     {
        id: "meta-frontend-dev",
        title: "Meta Front-End Developer Professional Certificate",
        provider: "Meta (Coursera)",
        level: "Fundamental",
        domain: "Web Development",
        tags: ["HTML", "CSS", "JavaScript", "React"],
        link: "https://www.coursera.org/professional-certificates/meta-front-end-developer"
    },
    {
        id: "cwd",
        title: "Certified Web Developer (CWD)",
        provider: "GAQM",
        level: "Professional",
        domain: "Web Development",
        tags: ["HTML", "CSS", "JavaScript"],
        link: "https://gaqm.org/certifications/information_technology/cwd"
    },
    // Programming
    {
        id: "ocp-java",
        title: "Oracle Certified Professional: Java SE Programmer",
        provider: "Oracle",
        level: "Professional",
        domain: "Programming",
        tags: ["Java", "OCP"],
        link: "https://education.oracle.com/oracle-certification-path/pFamily_48"
    },
    {
        id: "pcep",
        title: "PCEP – Certified Entry-Level Python Programmer",
        provider: "Python Institute",
        level: "Entry-Level",
        domain: "Programming",
        tags: ["Python", "PCEP"],
        link: "https://pythoninstitute.org/pcep"
    },
    // Marketing
    {
        id: "google-digital-marketing",
        title: "Google Digital Marketing & E-commerce Certificate",
        provider: "Google (Coursera)",
        level: "Fundamental",
        domain: "Marketing",
        tags: ["Marketing", "E-commerce", "SEO"],
        link: "https://www.coursera.org/professional-certificates/google-digital-marketing-ecommerce"
    },
    {
        id: "hubspot-inbound",
        title: "HubSpot Inbound Marketing Certification",
        provider: "HubSpot Academy",
        level: "Fundamental",
        domain: "Marketing",
        tags: ["HubSpot", "Marketing", "Inbound"],
        link: "https://academy.hubspot.com/certifications"
    },
];

const ITEMS_PER_PAGE = 12;
const domains = ["All Domains", ...Array.from(new Set(allCertifications.map(c => c.domain)))];


export default function CertificationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("All Domains");
  const [filteredCertifications, setFilteredCertifications] = useState(allCertifications);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const applyFilters = () => {
      let results = allCertifications;

      if (searchQuery) {
        const lowercasedQuery = searchQuery.toLowerCase();
        results = results.filter(cert =>
          cert.title.toLowerCase().includes(lowercasedQuery) ||
          cert.provider.toLowerCase().includes(lowercasedQuery) ||
          cert.tags.some(tag => tag.toLowerCase().includes(lowercasedQuery))
        );
      }

      if (selectedDomain !== "All Domains") {
        results = results.filter(cert => cert.domain === selectedDomain);
      }

      setFilteredCertifications(results);
      setCurrentPage(1); // Reset to first page on new filter
    };
    applyFilters();
  }, [searchQuery, selectedDomain]);


  const totalPages = Math.ceil(filteredCertifications.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCertifications = filteredCertifications.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col gap-8">
        <header>
            <h1 className="text-3xl font-bold font-headline">Explore Certifications</h1>
            <p className="text-muted-foreground">Validate your skills with industry-recognized certifications.</p>
        </header>

        <Card>
            <div className="p-4 flex flex-col sm:flex-row gap-4 border-b">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                        placeholder="Search for certifications..." 
                        className="pl-10 pr-4 py-2 w-full"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                 <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                    <SelectTrigger className="w-full sm:w-[240px]">
                        <SelectValue placeholder="Domain" />
                    </SelectTrigger>
                    <SelectContent>
                        {domains.map(domain => (
                            <SelectItem key={domain} value={domain}>{domain}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
             <div className="p-4">
                <Tabs defaultValue="all">
                    <TabsList>
                        <TabsTrigger value="all">All Certifications ({filteredCertifications.length})</TabsTrigger>
                        <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                        <TabsTrigger value="completed">Completed</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all" className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {currentCertifications.map((cert) => (
                                <CertificationCard key={cert.id} certification={cert} />
                            ))}
                        </div>
                        {currentCertifications.length === 0 && (
                            <div className="text-center py-16">
                                <Search className="mx-auto h-12 w-12 text-muted-foreground" />
                                <h3 className="mt-4 text-lg font-medium">No certifications found</h3>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Try adjusting your search or filters.
                                </p>
                            </div>
                        )}
                         {totalPages > 1 && (
                            <Pagination className="mt-8">
                                <PaginationContent>
                                    <PaginationItem>
                                        <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }} />
                                    </PaginationItem>
                                    {[...Array(totalPages)].map((_, i) => (
                                        <PaginationItem key={i}>
                                            <PaginationLink href="#" isActive={currentPage === i + 1} onClick={(e) => { e.preventDefault(); handlePageChange(i + 1); }}>
                                            {i + 1}
                                            </PaginationLink>
                                        </PaginationItem>
                                    ))}
                                    <PaginationItem>
                                    <PaginationNext href="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}/>
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                         )}
                    </TabsContent>
                     <TabsContent value="in-progress" className="mt-6">
                        <div className="text-center py-16">
                            <Award className="mx-auto h-12 w-12 text-muted-foreground" />
                            <h3 className="mt-4 text-lg font-medium">No certifications in progress</h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Start preparing for a certification to track your progress here.
                            </p>
                            <Button className="mt-6">Explore Certifications</Button>
                        </div>
                     </TabsContent>
                      <TabsContent value="completed" className="mt-6">
                         <div className="text-center py-16">
                            <Award className="mx-auto h-12 w-12 text-muted-foreground" />
                            <h3 className="mt-4 text-lg font-medium">No certifications completed yet</h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                                Your completed certifications will appear here.
                            </p>
                        </div>
                     </TabsContent>
                </Tabs>
            </div>
        </Card>
    </div>
  );
}
