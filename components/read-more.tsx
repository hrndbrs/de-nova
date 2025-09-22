"use client";

import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { useState } from "react";

interface ReadMoreProps {
  children: React.ReactNode;
  showExpanded?: boolean;
}

export const ReadMore = ({ children, showExpanded = false }: ReadMoreProps) => {
  const [isReadMoreShown, setReadMoreShown] = useState(false);

  const toggleReadMore = () => {
    setReadMoreShown(!isReadMoreShown);
  };

  return (
    <>
      {!showExpanded && (
        <Button
          onClick={toggleReadMore}
          size="sm"
          className="grid"
          style={{
            gridTemplateAreas: '"stack"',
          }}
        >
          <span
            className={cn(isReadMoreShown ? "invisible" : null)}
            style={{ gridArea: "stack" }}
          >
            Read More
          </span>
          <span
            className={cn(!isReadMoreShown ? "invisible" : null)}
            style={{ gridArea: "stack" }}
          >
            Read Less
          </span>
        </Button>
      )}
      {(isReadMoreShown || showExpanded) && children}
    </>
  );
};
