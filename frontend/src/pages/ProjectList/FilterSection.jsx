import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/Button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const FilterSection = ({
  categories,
  tags,
  onFilterCategory,
  onFilterTags,
  onFilterDates,
}) => {
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
          <p className="text-xl tracking-wider">Filters</p>
          <Button variant="ghost" size="icon">
            <MixerHorizontalIcon />
          </Button>
        </div>
        <CardContent className="mt-5">
          <ScrollArea className="space-y-7 h-[70vh] overflow-y-auto scrollbar-hide">
            {/* Filtro de categorias */}
            <div>
              <h1 className="pb-3 text-gray-400 border-b">Category</h1>
              <div className="pt-5">
                <RadioGroup
                  className="space-y-3 pt-5"
                  defaultValue="all"
                  onValueChange={onFilterCategory}
                >
                  <div key="all" className="flex items-center gap-2">
                    <RadioGroupItem value="" id="cat-all" />
                    <Label htmlFor="cat-all">All</Label>
                  </div>
                  {categories.map((categoria) => (
                    <div key={categoria.id} className="flex items-center gap-2">
                      <RadioGroupItem
                        value={categoria.nome}
                        id={`cat-${categoria.id}`}
                      />
                      <Label htmlFor={`cat-${categoria.id}`}>
                        {categoria.nome}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
            {/* Filtro de tags */}
            <div className="pt-9">
              <h1 className="pb-3 text-gray-400 border-b">Tag</h1>
              <div className="pt-5">
                <RadioGroup
                  className="space-y-3 pt-5"
                  defaultValue="all"
                  onValueChange={onFilterTags}
                >
                  <div key="all" className="flex items-center gap-2">
                    <RadioGroupItem value="" id="tag-all" />
                    <Label htmlFor="tag-all">All</Label>
                  </div>
                  {tags.map((tag) => (
                    <div key={tag.id} className="flex items-center gap-2">
                      <RadioGroupItem value={tag.nome} id={`tag-${tag.id}`} />
                      <Label htmlFor={`tag-${tag.id}`}>{tag.nome}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </div>
            {/* Filtro de datas com DatePicker */}
            <div className="pt-9 mr-6">
              <h1 className="pb-3 text-gray-400 border-b">Creation Date</h1>
              <div className="pt-5 space-y-3">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="min-date">Min Date</Label>
                  <DatePicker
                    selected={minDate}
                    onChange={handleMinDateChange}
                    dateFormat="dd-MM-yyyy"
                    placeholderText="Select min date"
                    id="min-date"
                    className="border w-full border-gray-700 py-2 px-3 rounded text-gray-700"
                    />
                </div>
                <div className="flex flex-col gap-1">
                  <Label htmlFor="max-date">Max Date</Label>
                  <DatePicker
                    selected={maxDate}
                    onChange={handleMaxDateChange}
                    dateFormat="dd-MM-yyyy"
                    placeholderText="Select max date"
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

export default FilterSection;
