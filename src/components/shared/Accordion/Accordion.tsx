import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import AccordionItem from "./AccordionItem";

const Accordion = () => {
    const [openAccordionBody, setAccordionBody] = useState<boolean | number>(
        false
    );

    const { data } = useQuery({
        queryKey: ["accordions"],
        queryFn: async () => {
            const res = await fetch(
                `${process.env.REACT_APP_API_URL}/accordions`
            );
            const data = await res.json();
            return data;
        },
    });
    
    const toggleAccordion = (index: number) => {
        if (openAccordionBody === index) {
            return setAccordionBody(false);
        }
        setAccordionBody(index);
    };
    return (
        <section className="container mb-16">
            <div className="space-y-10 w-8/12 text-center mx-auto">
                <h2 className="text-5xl font-semibold dark:font-normal text-black dark:text-white">
                    FAQ
                </h2>
            </div>
            <div className="shadow-lg mt-12 w-4/6 mx-auto dark:bg-white ">
                {data && data.map((accordion) => (
                    <AccordionItem
                        key={accordion._id}
                        id={accordion._id}
                        openAccordionBody={openAccordionBody === accordion._id}
                        accordion={accordion}
                        toggleAccordion={toggleAccordion}
                    />
                ))}
            </div>
        </section>
    );
};

export default Accordion;
