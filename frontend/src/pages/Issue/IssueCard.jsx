// src/components/Issue/IssueCard.jsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const IssueCard = ({ issue }) => {
  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>{issue.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Status: {issue.status}</p>
        <p>Prioridade: {issue.priority}</p>
        <p>
          Data de Vencimento:{" "}
          {issue.dueDate ? new Date(issue.dueDate).toLocaleDateString() : "N/A"}
        </p>
        <p>
          Criado em:{" "}
          {issue.createdAt ? new Date(issue.createdAt).toLocaleString() : "N/A"}
        </p>
      </CardContent>
    </Card>
  );
};

export default IssueCard;
