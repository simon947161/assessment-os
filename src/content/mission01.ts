export type Consequence = "bad-day" | "serious-injury" | "could-kill";

export type HazardOption = {
  id: string;
  label: string;
  isBest: boolean;
  feedback: string;
};

export type Hazard = {
  id: string;
  number: number;
  shortTitle: string;
  situation: string;
  consequence: Consequence;
  position: { x: number; y: number };
  options: HazardOption[];
  takeaway: string;
  sourceConcept: string;
};

export const hazards: Hazard[] = [
  {
    id: "trailing-cable",
    number: 1,
    shortTitle: "Trailing electrical cable",
    situation: "A power lead crosses the normal walking route.",
    consequence: "serious-injury",
    position: { x: 18, y: 75 },
    options: [
      {
        id: "reroute",
        label: "Stop access and safely reroute or protect the cable.",
        isBest: true,
        feedback: "Correct. Remove the trip hazard before work continues.",
      },
      {
        id: "step-over",
        label: "Tell people to step over it for now.",
        isBest: false,
        feedback:
          "Not yet. Stepping over it solves the problem for one person and leaves it for everyone else.",
      },
      {
        id: "cover-with-rag",
        label: "Put a rag over it so people notice the cable.",
        isBest: false,
        feedback:
          "That adds another trip hazard. The lead still needs to be rerouted or properly protected.",
      },
    ],
    takeaway: "Control the walkway hazard for everyone, not just the next person.",
    sourceConcept: "Access routes, electrical leads, hazard control and reporting.",
  },
  {
    id: "unlabelled-container",
    number: 2,
    shortTitle: "Unlabelled chemical container",
    situation: "A liquid has been transferred into a container with no label.",
    consequence: "could-kill",
    position: { x: 88, y: 60 },
    options: [
      {
        id: "isolate",
        label: "Do not use it; isolate it and report it for identification.",
        isBest: true,
        feedback: "Correct. An unknown substance must not be used.",
      },
      {
        id: "smell",
        label: "Open it and smell it to work out what it is.",
        isBest: false,
        feedback: "Not safe. Exposure is not an identification method.",
      },
      {
        id: "use-small-amount",
        label: "Try a small amount on a test surface.",
        isBest: false,
        feedback:
          "Not safe. A smaller mystery chemical is still a mystery chemical.",
      },
    ],
    takeaway: "If the label is missing, stop and have the substance identified.",
    sourceConcept: "Chemical identification, labels, SDS and reporting.",
  },
  {
    id: "paint-spill",
    number: 3,
    shortTitle: "Uncontrolled paint spill",
    situation: "A wet spill is spreading into the floor traffic route.",
    consequence: "serious-injury",
    position: { x: 31, y: 84 },
    options: [
      {
        id: "isolate-spill",
        label: "Keep people away and follow the workplace spill procedure.",
        isBest: true,
        feedback: "Correct. Isolate the area and respond to the material safely.",
      },
      {
        id: "walk-around",
        label: "Leave it until the current task is finished.",
        isBest: false,
        feedback:
          "Not yet. Walking around a spill does not turn it into a control measure.",
      },
      {
        id: "cover-spill",
        label: "Cover it with cardboard and keep the area moving.",
        isBest: false,
        feedback:
          "That hides the spill without controlling it. Keep people away and use the correct spill response.",
      },
    ],
    takeaway: "A spill needs control, not a wider step around it.",
    sourceConcept: "Spill response, isolation, SDS and housekeeping.",
  },
  {
    id: "poor-ventilation",
    number: 4,
    shortTitle: "Poor ventilation",
    situation: "Solvent-based work is underway with the room closed up.",
    consequence: "could-kill",
    position: { x: 62, y: 28 },
    options: [
      {
        id: "ventilate",
        label: "Stop and establish suitable ventilation and controls.",
        isBest: true,
        feedback: "Correct. Do not continue until exposure is properly controlled.",
      },
      {
        id: "work-faster",
        label: "Finish quickly so the container can be closed.",
        isBest: false,
        feedback:
          "Not safe. Working faster does not control hazardous vapour.",
      },
      {
        id: "open-door-only",
        label: "Open the door and continue without checking the controls.",
        isBest: false,
        feedback:
          "Not enough. Ventilation must be suitable for the product and the work, not just feel less stuffy.",
      },
    ],
    takeaway: "Control airborne exposure before solvent-based work continues.",
    sourceConcept: "Ventilation, hazardous substances and exposure controls.",
  },
  {
    id: "unsafe-ladder",
    number: 5,
    shortTitle: "Unsafe ladder",
    situation: "The ladder is unstable and badly positioned for the task.",
    consequence: "could-kill",
    position: { x: 45, y: 42 },
    options: [
      {
        id: "remove-ladder",
        label: "Stop and use stable access equipment suited to the task.",
        isBest: true,
        feedback: "Correct. Fix the access method before anyone climbs.",
      },
      {
        id: "hold-ladder",
        label: "Ask someone to hold it while the job is finished.",
        isBest: false,
        feedback: "Not enough. A person holding it does not fix unsuitable equipment.",
      },
      {
        id: "quick-job",
        label: "Use it once because the job will only take a minute.",
        isBest: false,
        feedback:
          "Not safe. “It’ll only take a minute” is not a ladder rating.",
      },
    ],
    takeaway: "Use sound, stable access equipment before starting work at height.",
    sourceConcept: "Ladder condition, positioning and suitable access equipment.",
  },
  {
    id: "missing-eye-protection",
    number: 6,
    shortTitle: "Missing eye protection",
    situation: "Sanding is underway without suitable eye protection.",
    consequence: "serious-injury",
    position: { x: 74, y: 43 },
    options: [
      {
        id: "wear-ppe",
        label: "Stop and use correctly fitted eye protection and dust controls.",
        isBest: true,
        feedback: "Correct. Put the required controls in place before sanding.",
      },
      {
        id: "look-away",
        label: "Look away from the tool while the dust clears.",
        isBest: false,
        feedback: "Not safe. Squinting is not certified eye protection.",
      },
      {
        id: "finish-section",
        label: "Finish this small section, then put the PPE on.",
        isBest: false,
        feedback:
          "The exposure has already started. Stop and put the controls in place first.",
      },
    ],
    takeaway: "PPE must be suitable, fitted and used before exposure starts.",
    sourceConcept: "Eye protection, sanding dust and combined controls.",
  },
  {
    id: "blocked-exit",
    number: 7,
    shortTitle: "Blocked emergency exit",
    situation: "Materials have been placed across the emergency exit route.",
    consequence: "could-kill",
    position: { x: 57, y: 48 },
    options: [
      {
        id: "clear-exit",
        label: "Clear the exit route immediately and keep it unobstructed.",
        isBest: true,
        feedback: "Correct. Emergency access must be available at all times.",
      },
      {
        id: "move-later",
        label: "Move the materials at the end of the shift.",
        isBest: false,
        feedback: "Not yet. An emergency will not wait for the shift to end.",
      },
      {
        id: "leave-gap",
        label: "Leave a narrow gap that people can squeeze through.",
        isBest: false,
        feedback:
          "Not enough. An emergency exit is not bonus storage, even with a gap.",
      },
    ],
    takeaway: "Emergency routes are never temporary storage.",
    sourceConcept: "Emergency access, housekeeping and evacuation.",
  },
  {
    id: "unsafe-storage",
    number: 8,
    shortTitle: "Unsafe material storage",
    situation: "Paint tins and materials are stacked insecurely.",
    consequence: "serious-injury",
    position: { x: 92, y: 77 },
    options: [
      {
        id: "store-safely",
        label: "Stop and store the materials securely in the correct area.",
        isBest: true,
        feedback: "Correct. Stable, compatible storage prevents another hazard.",
      },
      {
        id: "leave-stack",
        label: "Leave the stack if nobody needs that corner.",
        isBest: false,
        feedback: "Not safe. Poor storage can fail without anyone touching it.",
      },
      {
        id: "restack-higher",
        label: "Restack the tins higher to clear more floor space.",
        isBest: false,
        feedback:
          "That may make the stack less stable. A tower of paint tins is not a shelving system.",
      },
    ],
    takeaway: "Store materials securely and follow their label and SDS requirements.",
    sourceConcept: "Secure storage, compatibility, labels and SDS.",
  },
  {
    id: "missing-tool-guard",
    number: 9,
    shortTitle: "Missing tool guard",
    situation: "A power tool has a damaged or missing guard.",
    consequence: "could-kill",
    position: { x: 81, y: 66 },
    options: [
      {
        id: "isolate-tool",
        label: "Do not use it; isolate, tag and report the tool.",
        isBest: true,
        feedback: "Correct. Defective equipment must be taken out of use.",
      },
      {
        id: "careful-use",
        label: "Use it carefully for this one small job.",
        isBest: false,
        feedback: "Not safe. Care does not replace a required guard.",
      },
      {
        id: "tell-next-worker",
        label: "Finish the cut, then tell the next worker about the guard.",
        isBest: false,
        feedback:
          "Not safe. Isolate defective equipment now so nobody can use it.",
      },
    ],
    takeaway: "Never use equipment with a missing or defeated safety guard.",
    sourceConcept: "Equipment inspection, guarding, isolation and reporting.",
  },
  {
    id: "missing-barricade",
    number: 10,
    shortTitle: "Missing work-zone barricade",
    situation: "Other people can walk directly into the active work area.",
    consequence: "serious-injury",
    position: { x: 10, y: 56 },
    options: [
      {
        id: "set-boundary",
        label: "Set up suitable signage and a safe work-zone boundary.",
        isBest: true,
        feedback: "Correct. Control access before the work continues.",
      },
      {
        id: "call-out",
        label: "Call out a warning whenever someone comes close.",
        isBest: false,
        feedback: "Not enough. The work zone needs a control that is always present.",
      },
      {
        id: "single-sign",
        label: "Put one sign inside the work area where it will stay clean.",
        isBest: false,
        feedback:
          "People need the warning before they enter. Put the boundary and signs where they control access.",
      },
    ],
    takeaway: "People need a clear boundary before they enter the hazard area.",
    sourceConcept: "Signage, barricades, public protection and access control.",
  },
];

export const hazardById = new Map(hazards.map((hazard) => [hazard.id, hazard]));
