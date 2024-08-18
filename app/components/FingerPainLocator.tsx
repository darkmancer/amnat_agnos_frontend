"use client";
import Image from "next/image";
import * as d3 from "d3";
import { useEffect, useRef, useState } from "react";

export default function FingerPainLocator() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [activeAreas, setActiveAreas] = useState<string[]>([]);

  const areas = [
    {
      id: "dip",
      coordinate: [
        { x: 92, y: 182, angle: -12 },
        { x: 164, y: 103, angle: -3 },
        { x: 228, y: 73, angle: -3 },
        { x: 301, y: 91, angle: -3 },
      ],
      hitBoxSize: "s",
    },
    {
      id: "pip",
      coordinate: [
        { x: 115, y: 233, angle: -18 },
        { x: 172, y: 178, angle: -10 },
        { x: 234, y: 152, angle: -3 },
        { x: 301, y: 162, angle: 0 },
        { x: 425, y: 300, angle: 38 },
      ],
      hitBoxSize: "m",
    },
    {
      id: "mcp",
      coordinate: [
        { x: 140, y: 300, angle: -20 },
        { x: 190, y: 278, angle: -20 },
        { x: 243, y: 260, angle: 0 },
        { x: 296, y: 260, angle: 4 },
        { x: 378, y: 382, angle: 24 },
      ],
      hitBoxSize: "l",
    },
    {
      id: "others",
      coordinate: [{ x: 244, y: 660, angle: 0 }],
      hitBoxSize: "others",
    },
  ];

  useEffect(() => {
    const svg = d3.select(svgRef.current);

    areas.forEach((area) => {
      area.coordinate.forEach((coord) => {
        const width =
          area.hitBoxSize === "s"
            ? 35
            : area.hitBoxSize === "m"
            ? 37
            : area.hitBoxSize === "l"
            ? 45
            : 408;
        const height =
          area.hitBoxSize === "s"
            ? 25
            : area.hitBoxSize === "m"
            ? 27
            : area.hitBoxSize === "l"
            ? 35
            : 60;
        const cornerRadius = 10;

        const path = d3.path();

        path.moveTo(coord.x - width / 2 + cornerRadius, coord.y - height / 2);
        path.arcTo(
          coord.x + width / 2,
          coord.y - height / 2,
          coord.x + width / 2,
          coord.y + height / 2,
          cornerRadius
        );
        path.arcTo(
          coord.x + width / 2,
          coord.y + height / 2,
          coord.x - width / 2,
          coord.y + height / 2,
          cornerRadius
        );
        path.arcTo(
          coord.x - width / 2,
          coord.y + height / 2,
          coord.x - width / 2,
          coord.y - height / 2,
          cornerRadius
        );
        path.arcTo(
          coord.x - width / 2,
          coord.y - height / 2,
          coord.x + width / 2,
          coord.y - height / 2,
          cornerRadius
        );
        path.closePath();

        svg
          .append("path")
          .attr("d", path.toString())
          .attr("fill", "transparent")
          .attr("stroke", "red")
          .attr("stroke-width", 2)
          .attr("transform", `rotate(${coord.angle}, ${coord.x}, ${coord.y})`)
          .on("click", () => {
            if (area.id === "others") {
              if (activeAreas.includes("others")) {
                setActiveAreas([]);
              } else {
                setActiveAreas(["others"]);
              }
            } else {
              setActiveAreas((prev) => {
                const newActiveAreas = prev.includes(area.id)
                  ? prev.filter((id) => id !== area.id)
                  : [...prev.filter((id) => id !== "others"), area.id];
                return newActiveAreas;
              });
            }
          });
      });
    });
  }, [areas, activeAreas]);

  return (
    <div className="flex justify-center items-center  w-full bg-gray-100 overflow-hidden">
      <div className="relative max-w-[500px] w-full">
        <Image
          src="/assets/finger/default-finger.png"
          alt="Default Finger"
          width={500}
          height={700}
          className="object-contain relative"
          unoptimized
        />

        {activeAreas.includes("dip") && (
          <>
            <Image
              src="/assets/finger/dip-highlight.png"
              alt="DIP Highlighted"
              width={500}
              height={700}
              className="absolute top-0 left-0 object-contain"
              unoptimized
            />
            <Image
              src="/assets/finger/dip-active.png"
              alt="DIP Active"
              width={500}
              height={700}
              className="absolute top-0 left-0 object-contain"
              unoptimized
            />
          </>
        )}

        {activeAreas.includes("pip") && (
          <>
            <Image
              src="/assets/finger/pip-highlight.png"
              alt="PIP Highlighted"
              width={500}
              height={700}
              className="absolute top-0 left-0 object-contain"
              unoptimized
            />
            <Image
              src="/assets/finger/pip-active.png"
              alt="PIP Active"
              width={500}
              height={700}
              className="absolute top-0 left-0 object-contain"
              unoptimized
            />
          </>
        )}

        {activeAreas.includes("mcp") && (
          <>
            <Image
              src="/assets/finger/mcp-highlight.png"
              alt="MCP Highlighted"
              width={500}
              height={700}
              className="absolute top-0 left-0 object-contain"
              unoptimized
            />
            <Image
              src="/assets/finger/mcp-active.png"
              alt="MCP Active"
              width={500}
              height={700}
              className="absolute top-0 left-0 object-contain"
              unoptimized
            />
          </>
        )}

        {activeAreas.includes("others") && (
          <>
            <Image
              src="/assets/finger/others-highlight.png"
              alt="Others Highlighted"
              width={500}
              height={700}
              className="absolute top-0 left-0 object-contain"
              unoptimized
            />
          </>
        )}
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          className="absolute"
          style={{ top: 0, left: 0 }}
          viewBox="0 0 500 700"
        ></svg>
      </div>
    </div>
  );
}
