// src/components/Demandas/FilterSectionDemandas.jsx
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { ScrollArea } from "@/components/ui/scroll-area";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Label } from "@/components/ui/label";

const FilterSectionDemandas = ({ onFilterDates }) => {
  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);

  const handleMinDateChange = (date) => {
    setMinDate(date);
    onFilterDates({
      minDate: date ? date.toISOString().slice(0, 10) : "",
      maxDate: maxDate ? maxDate.toISOString().slice(0, 10) : "",
    });
  };

  const handleMaxDateChange = (date) => {
    setMaxDate(date);
    onFilterDates({
      minDate: minDate ? minDate.toISOString().slice(0, 10) : "",
      maxDate: date ? date.toISOString().slice(0, 10) : "",
    });
  };

  return (
    <section className="filterSection">
      <Card className="p-5 sticky top-10">
        <div className="flex justify-between lg:w-[20rem]">
          <p className="text-xl tracking-wider">Filtros</p>
          <Button variant="ghost" size="icon">
            {/* Você pode inserir um ícone aqui se desejar */}
          </Button>
        </div>
        <CardContent className="mt-5">
          <ScrollArea className="space-y-7 h-[70vh] overflow-y-auto scrollbar-hide">
            {/* Filtro de Datas com DatePicker */}
            <div className="pt-9 mr-6">
              <h1 className="pb-3 text-gray-400 border-b">Data de Criação</h1>
              <div className="pt-5 space-y-3">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="min-date">Data Mínima</Label>
                  <DatePicker
                    selected={minDate}
                    onChange={handleMinDateChange}
                    dateFormat="dd-MM-yyyy"
                    placeholderText="Selecione a data mínima"
                    id="min-date"
                    className="border w-full border-gray-700 py-2 px-3 rounded text-gray-700"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="max-date">Data Máxima</Label>
                  <DatePicker
                    selected={maxDate}
                    onChange={handleMaxDateChange}
                    dateFormat="dd-MM-yyyy"
                    placeholderText="Selecione a data máxima"
                    id="max-date"
                    className="border w-full border-gray-700 py-2 px-3 rounded text-gray-700"
                  />
                </div>
              </div>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </section>
  );
};

export default FilterSectionDemandas;
