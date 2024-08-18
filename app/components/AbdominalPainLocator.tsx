"use client";
import { useEffect, useRef, useState, useMemo } from "react";
import * as d3 from "d3";
import Image from "next/image";

export default function AbdominalPainLocator({
  onAreaSelected,
}: {
  onAreaSelected: () => void;
}) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [allOverSelected, setAllOverSelected] = useState<boolean>(false);

  const areas = useMemo(
    () => [
      {
        id: "epigastrium",
        label: "Epigastrium",
        d: "M157,54 Q190,65 198,94 L157,146 L115,94 Q120,65 157,54Z",
        highlightImage: "/assets/abdominal/epigastrium-highlight.png",
        activeImage: "/assets/abdominal/epigastrium-active.png",
      },
      {
        id: "luq",
        label: "Luq",
        d: "M204,100 Q215,95 242,118 L250,174 L194,176 Q195,165 172,146 Z",
        highlightImage: "/assets/abdominal/luq-highlight.png",
        activeImage: "/assets/abdominal/luq-active.png",
      },
      {
        id: "ruq",
        label: "Ruq",
        d: "M105,100 Q86,103 68,123 L62,174 L120,178 Q120,160 144,148 Z",
        highlightImage: "/assets/abdominal/ruq-highlight.png",
        activeImage: "/assets/abdominal/ruq-active.png",
      },
      {
        id: "rlq",
        label: "Rlq",
        d: "M114,267 Q99,280 60,222 L62,188 L118,188 Q120,200 140,215 Q124,230 114,267Z",
        highlightImage: "/assets/abdominal/rlq-highlight.png",
        activeImage: "/assets/abdominal/rlq-active.png",
      },
      {
        id: "llq",
        label: "Llq",
        d: "M210,268 Q260,224 250,188 L194,187 Q193,204 174,217 Q193,228 206,268Z",
        highlightImage: "/assets/abdominal/llq-highlight.png",
        activeImage: "/assets/abdominal/llq-active.png",
      },
      {
        id: "suprapubic",
        label: "Suprapubic",
        d: "M158,294 Q178,292 198,273 Q188,232 158,218 Q138,222 118,272 Q134,292 158,294Z",
        highlightImage: "/assets/abdominal/suprapubic-highlight.png",
        activeImage: "/assets/abdominal/suprapubic-active.png",
      },
      {
        id: "umbilicus",
        label: "Umbilicus",
        d: "M156,155 A28,28 0 1,0 157,155 Z",
        highlightImage: "/assets/abdominal/umbilicus-highlight.png",
        activeImage: "/assets/abdominal/umbilicus-active.png",
      },
      {
        id: "all-over",
        label: "All Over",
        d: "M84,424 L226,424 Q274,452 226,482 L82,482 Q40,452 80,424 Z",
        highlightImage: "/assets/abdominal/all-over-highlight.png",
        activeImage: null,
      },
    ],
    []
  );

  const allAreasSelectedExceptAllOver = useMemo(
    () =>
      selectedAreas.length === areas.length - 1 &&
      !selectedAreas.includes("all-over"),
    [selectedAreas, areas]
  );

  useEffect(() => {
    if (allAreasSelectedExceptAllOver) {
      setAllOverSelected(true);
      setSelectedAreas(areas.map((area) => area.id));
    }
  }, [allAreasSelectedExceptAllOver, areas]);

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    svg
      .selectAll("path")
      .data(areas)
      .enter()
      .append("path")
      .attr("d", (d) => d.d)
      .attr("fill", "none")
      .attr("stroke", "none")
      .attr("pointer-events", "all")
      .on("click", (event: any, d: any) => {
        if (d.id === "all-over") {
          setAllOverSelected((prev) => {
            if (prev) {
              setSelectedAreas([]);
            } else {
              setSelectedAreas(areas.map((area) => area.id));
            }
            return !prev;
          });
        } else {
          setAllOverSelected(false);
          setSelectedAreas((prev) =>
            prev.includes(d.id)
              ? prev.filter((id) => id !== d.id)
              : [...prev.filter((id) => id !== "all-over"), d.id]
          );
        }
        onAreaSelected();
      });
  }, [areas, onAreaSelected]);

  return (
    <div className="flex justify-center items-center w-full bg-white overflow-hidden p-4">
      <div className="relative w-full max-w-[500px] md:max-w-[600px]">
        <Image
          src="/assets/abdominal/default-abs.png"
          alt="Default Abdominal"
          layout="responsive"
          width={500}
          height={700}
          className="object-contain relative"
        />
        {areas.map((area) => (
          <div key={area.id}>
            {(selectedAreas.includes(area.id) || allOverSelected) && (
              <>
                <Image
                  src={area.highlightImage}
                  alt={`${area.label} Highlighted`}
                  layout="responsive"
                  width={500}
                  height={700}
                  className="absolute top-0 left-0 object-contain"
                  unoptimized
                />
                {!allAreasSelectedExceptAllOver &&
                  !allOverSelected &&
                  area.activeImage && (
                    <Image
                      src={area.activeImage}
                      alt={`${area.label} Active`}
                      layout="responsive"
                      width={500}
                      height={700}
                      className="absolute top-0 left-0 object-contain"
                      unoptimized
                    />
                  )}
              </>
            )}
          </div>
        ))}
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          viewBox="0 0 500 700"
          className="absolute"
          style={{ top: "27%", left: "14%" }}
        ></svg>
      </div>
    </div>
  );
}
