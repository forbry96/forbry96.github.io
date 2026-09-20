const tests = {
  "pre": [
    {
      "q": "Which statement best describes a sound deductive argument?",
      "opts": [
        "Its conclusion seems more likely than the alternatives.",
        "Its premises are widely accepted by most people.",
        "Its reasoning is valid and its premises are true.",
        "Its conclusion is supported by at least some evidence."
      ],
      "a": 2,
      "exp": "A deductive argument is sound when its structure is valid and its premises are true."
    },
    {
      "q": "When evaluating a historical claim, what is the fairest standard?",
      "opts": [
        "Accept it only if we have direct physical evidence.",
        "Ask what evidence we should expect and how well it fits.",
        "Reject it unless several eyewitness documents survive.",
        "Treat testimony as weaker than every other kind of evidence."
      ],
      "a": 1,
      "exp": "Historical reasoning asks what evidence is reasonable to expect and then weighs the quality of the evidence we actually have."
    },
    {
      "q": "Suppose the universe had always existed. What would a contingency argument still ask?",
      "opts": [
        "Whether an eternal universe could contain physical laws.",
        "Whether an eternal universe must also be infinitely large.",
        "Whether something eternal could ever undergo change.",
        "Whether the universe exists necessarily or still depends on something else."
      ],
      "a": 3,
      "exp": "Contingency is about dependence, not simply duration. Something could exist without a first moment and still depend on something else for its existence."
    },
    {
      "q": "Which claim is actually a premise of the Kalam cosmological argument?",
      "opts": [
        "Whatever begins to exist has a cause.",
        "Every existing thing has a cause.",
        "Every cause must occur earlier in time.",
        "Whatever changes must have been created."
      ],
      "a": 0,
      "exp": "The Kalam begins with the narrower claim that whatever begins to exist has a cause; it does not say everything has a cause."
    },
    {
      "q": "What makes a design argument stronger than simply saying, “This looks complicated”?",
      "opts": [
        "Showing that the feature is difficult for us to understand.",
        "Showing that the feature serves some useful purpose.",
        "Comparing competing causes and asking which better explains the relevant pattern.",
        "Showing that no natural process has ever produced anything complex."
      ],
      "a": 2,
      "exp": "A responsible design argument compares explanatory candidates for a relevant pattern rather than treating complexity by itself as proof."
    },
    {
      "q": "What is the central question in a fine-tuning argument?",
      "opts": [
        "Why the universe contains so much empty space.",
        "Why life exists on Earth rather than another planet.",
        "Whether physical constants could ever have different measured values.",
        "How best to explain a life-permitting range of physical conditions."
      ],
      "a": 3,
      "exp": "Fine-tuning arguments compare explanations for the life-permitting values or conditions of the universe."
    },
    {
      "q": "What does an irreducible-complexity argument claim most directly?",
      "opts": [
        "Any complicated biological structure must have been created instantly.",
        "A present basic function depends on several coordinated parts, raising a historical question about how that system arose.",
        "Every individual part of a biological system has no function outside the complete system.",
        "Evolutionary processes can never produce any new biological function."
      ],
      "a": 1,
      "exp": "Irreducible complexity concerns dependence of a present function on coordinated parts. That does not by itself prove that the parts never had other functions or that no evolutionary history is possible."
    },
    {
      "q": "If objective moral duties really exist, what does a moral argument mainly ask?",
      "opts": [
        "Why people disagree about moral questions.",
        "What could ground those duties as objectively binding.",
        "Why religious people often behave morally.",
        "Whether moral feelings developed through evolution."
      ],
      "a": 1,
      "exp": "The moral argument focuses on the grounding of objective moral truths or duties, not on whether people can behave morally without belief in God."
    },
    {
      "q": "What distinction is central to the argument from reason?",
      "opts": [
        "The difference between having a brain and having a mind.",
        "The difference between conscious thought and unconscious thought.",
        "What causes a belief versus what justifies it rationally.",
        "The difference between scientific reasoning and philosophical reasoning."
      ],
      "a": 2,
      "exp": "A causal story about why a belief occurred is not automatically the same as a rational account of why the belief is justified or true."
    },
    {
      "q": "If God exists, what follows most directly for a discussion of miracles?",
      "opts": [
        "Miracles become possible in principle, but each alleged miracle still needs evidence.",
        "Miracles become the best explanation of every unusual event.",
        "Scientific laws no longer apply whenever God acts.",
        "Reports of miracles should be accepted unless disproved."
      ],
      "a": 0,
      "exp": "Theism removes a blanket claim that miracles are impossible, but it does not establish that any particular miracle occurred."
    },
    {
      "q": "Why can a historian use New Testament documents without first assuming Christianity is true?",
      "opts": [
        "Religious texts are automatically reliable historical sources.",
        "Ancient documents can be evaluated historically before accepting their theology.",
        "The New Testament contains more manuscripts than any other ancient work.",
        "Christian authors are less likely than other authors to be biased."
      ],
      "a": 1,
      "exp": "A document can be examined historically for date, genre, claims, sources, and corroboration without first granting its religious conclusions."
    },
    {
      "q": "Why do Jesus’ own claims matter before evaluating what the resurrection means?",
      "opts": [
        "They show that every Gospel detail must be historical.",
        "They give the resurrection a specific context: it would confirm or challenge Jesus’ claimed identity and authority.",
        "They prove the New Testament canon immediately.",
        "They make the empty tomb unnecessary."
      ],
      "a": 1,
      "exp": "A resurrection has special Christian significance because it concerns the Jesus who had already made extraordinary claims about his identity and authority."
    },
    {
      "q": "Which statement best reflects the historical case for Jesus’ death and the empty tomb?",
      "opts": [
        "Both are equally undisputed among historians.",
        "The empty tomb is stronger than the crucifixion.",
        "Jesus’ death by crucifixion is very strong historically; the empty tomb is significant but more debated.",
        "Neither can be investigated historically."
      ],
      "a": 2,
      "exp": "The course deliberately distinguishes the very strong crucifixion evidence from the more debated empty-tomb case."
    },
    {
      "q": "What is the best way to argue for the resurrection in this course?",
      "opts": [
        "Use one dramatic fact as a stand-alone proof.",
        "Compare how well competing explanations account for death, early proclamation, appearances, and tomb evidence together.",
        "Assume miracles are impossible until natural explanations fail absolutely.",
        "Treat every historical detail as equally certain."
      ],
      "a": 1,
      "exp": "The resurrection case is cumulative and explanatory rather than a one-fact proof."
    },
    {
      "q": "How should “liar, lunatic, or Lord” be used?",
      "opts": [
        "As a complete deductive proof.",
        "As a clinical diagnosis of Jesus.",
        "As a synthesis after adding alternatives such as legend and misunderstanding and testing them against the evidence.",
        "As a replacement for resurrection evidence."
      ],
      "a": 2,
      "exp": "The broadened trilemma is useful after the historical groundwork, not as a shortcut around it."
    },
    {
      "q": "Why is the resurrection more than simply an unusual miracle in the classical argument?",
      "opts": [
        "Because every miracle automatically proves every doctrine.",
        "Because in the setting of Jesus’ claims, God raising Jesus functions as a vindication of Jesus.",
        "Because miracles replace the need for historical sources.",
        "Because resurrection is a law of nature."
      ],
      "a": 1,
      "exp": "The event’s meaning comes from its context: the person God raises is the Jesus who made extraordinary claims."
    },
    {
      "q": "What follows if Jesus is divinely vindicated?",
      "opts": [
        "Every Christian interpretation becomes infallible.",
        "His authoritative teaching about God deserves trust.",
        "The exact New Testament canon is immediately proven.",
        "Historical evidence is no longer needed."
      ],
      "a": 1,
      "exp": "The resurrection-vindication step establishes Jesus’ authority, which is then used to examine what he teaches about revelation."
    },
    {
      "q": "What does Jesus’ use of the Old Testament support most directly?",
      "opts": [
        "That one verse supplies a complete modern table of contents.",
        "That Jesus treats Israel’s Scriptures as divine and authoritative.",
        "That no Old Testament passage requires interpretation.",
        "That textual criticism is unnecessary."
      ],
      "a": 1,
      "exp": "Jesus’ settled posture toward Scripture supports its divine authority without pretending one saying settles every canon question."
    },
    {
      "q": "What is the careful argument from Jesus to the New Testament?",
      "opts": [
        "Jesus personally named all 27 books.",
        "Jesus authorized apostles, promised help for their witness, and the church recognized writings tied to that apostolic authority.",
        "The church made the books authoritative by voting.",
        "Any early Christian writing is therefore Scripture."
      ],
      "a": 1,
      "exp": "The New Testament step runs through Christ-authorized apostolic witness and historical canon recognition."
    },
    {
      "q": "What is the final claim of the core course?",
      "opts": [
        "Every interpretation of the Bible is equally true.",
        "The God argued for has spoken in Christ and Scripture, so God’s truthful revelation is trustworthy.",
        "Only natural theology matters.",
        "The resurrection makes interpretation unnecessary."
      ],
      "a": 1,
      "exp": "The cumulative path is meant to provide rational grounds for receiving Scripture as God’s truthful revelation."
    }
  ],
  "post": [
    {
      "q": "An argument has true premises, but its conclusion does not actually follow from them. What is the problem?",
      "opts": [
        "The argument is invalid even though its premises are true.",
        "The argument is valid but not sound.",
        "The argument is sound but not persuasive.",
        "The argument is inductive rather than deductive."
      ],
      "a": 0,
      "exp": "True premises do not rescue an invalid inference. In a deductive argument, the conclusion must follow from the premises."
    },
    {
      "q": "Someone says, “You weren't there, so you cannot know Jesus was crucified.” What is the best first reply?",
      "opts": [
        "Historical knowledge never depends on eyewitnesses.",
        "Ancient claims are reliable unless someone disproves them.",
        "We routinely know past events through evaluated testimony, documents, and other evidence.",
        "Crucifixion is so common in antiquity that evidence is unnecessary."
      ],
      "a": 2,
      "exp": "The issue is not personal observation but whether the surviving historical evidence is strong enough to justify belief."
    },
    {
      "q": "A skeptic says, “Maybe the universe has existed forever, so it needs no God.” Which response best uses the contingency argument?",
      "opts": [
        "Anything eternal must be divine by definition.",
        "If the universe is eternal, the Kalam has already been proven.",
        "Eternal existence would not make the universe necessary or self-explanatory.",
        "Modern cosmology has already ruled out every eternal model."
      ],
      "a": 2,
      "exp": "Contingency asks whether reality is dependent or necessary. Existing forever would not by itself make the universe self-existent."
    },
    {
      "q": "Someone objects, “If everything needs a cause, who caused God?” What is the most accurate correction?",
      "opts": [
        "God is the one exception to an otherwise universal rule.",
        "The Kalam concerns things that begin to exist, not everything without exception.",
        "Causes exist only inside the universe, so the question is meaningless.",
        "God caused himself, which ends the regress."
      ],
      "a": 1,
      "exp": "The Kalam does not claim that everything has a cause. It argues that whatever begins to exist has a cause."
    },
    {
      "q": "Which observation would be most relevant to a design inference?",
      "opts": [
        "A structure is very complicated and difficult to describe.",
        "A pattern resembles effects we independently know intelligence can produce, while alternatives are comparatively weak.",
        "A feature is useful to an organism and therefore must be designed.",
        "Scientists have not yet reached complete agreement about how a feature arose."
      ],
      "a": 1,
      "exp": "Design reasoning is strongest when it compares causes using features that are actually diagnostic of intelligence, not mere complexity or current ignorance."
    },
    {
      "q": "A critic says, “A multiverse could explain fine-tuning.” What is the best response?",
      "opts": [
        "A multiverse is impossible because we cannot directly observe other universes.",
        "A multiverse automatically confirms design because it would need a designer too.",
        "A multiverse is possible, but it still needs independent support, a workable universe-producing mechanism, and evidence that it explains the life-permitting conditions better than design.",
        "A multiverse would make fine-tuning disappear because every universe would permit life."
      ],
      "a": 2,
      "exp": "Possibility is not the same as evidence. Multiverse models are difficult to test and need independent support; they should be compared with design rather than simply assumed from the fine-tuning itself."
    },
    {
      "q": "A flagellum stops working when one of its present core parts is removed. What follows from that observation alone?",
      "opts": [
        "It proves that no ancestral version could have used fewer parts or different functions.",
        "It proves that natural selection cannot act on molecular systems.",
        "It shows present functional dependence, but the system’s evolutionary history still has to be argued separately.",
        "It proves that every protein in the flagellum was designed for only that one function."
      ],
      "a": 2,
      "exp": "Present-day dependence is evidence about the current system. The historical inference is a further question, so design and evolutionary pathways still have to be compared."
    },
    {
      "q": "An atheist says, “I can be moral without believing in God.” What should the moral argument say?",
      "opts": [
        "The argument is about what grounds objective moral duties, not who can behave morally.",
        "The argument shows moral behavior is impossible without religious belief.",
        "The argument concerns whether moral rules produce social benefits.",
        "The argument depends on everyone agreeing about the same moral rules."
      ],
      "a": 0,
      "exp": "The moral argument asks what makes objective moral duties real and binding, not whether atheists can behave morally."
    },
    {
      "q": "Neuroscience explains a brain process that occurs when someone reasons. What question can still remain?",
      "opts": [
        "Whether the brain process happened before the conclusion was spoken.",
        "Whether the reasoning was justified and truth-directed, not merely caused.",
        "Whether all reasoning must happen consciously.",
        "Whether neuroscience can study religious people objectively."
      ],
      "a": 1,
      "exp": "Explaining the physical cause of a belief does not automatically explain its rational warrant or truth."
    },
    {
      "q": "A person says, “Science has never observed a resurrection, so resurrection is impossible.” Where is the first issue?",
      "opts": [
        "Whether Christianity rejects ordinary scientific regularities.",
        "Whether the person has defined resurrection precisely enough.",
        "Whether God could act in nature before judging the historical claim.",
        "Whether ancient people understood that dead people normally stay dead."
      ],
      "a": 2,
      "exp": "Before evaluating a particular miracle historically, the conversation may need to address whether miracles are ruled out in principle."
    },
    {
      "q": "Two ancient sources report the same event, but one copied the other. How should that affect historical reasoning?",
      "opts": [
        "They still count as two fully independent witnesses.",
        "Both sources become useless because dependence destroys historical value.",
        "It may still help, but it is not independent confirmation.",
        "Dependence matters only when the authors disagree."
      ],
      "a": 2,
      "exp": "Literary dependence reduces independence, though a dependent source may still preserve useful historical information."
    },
    {
      "q": "Someone says, “Jesus never used the exact English sentence ‘I am God.’” What is the strongest response?",
      "opts": [
        "Then Christians should abandon the claim.",
        "The historical question is broader: Jesus’ actions, titles, claimed prerogatives, and relationship to the Father form a cumulative case.",
        "Only John matters for Jesus’ identity.",
        "Any use of “Son of God” automatically proves deity."
      ],
      "a": 1,
      "exp": "A serious historical case does not reduce Jesus’ identity to one modern phrase or one title."
    },
    {
      "q": "A skeptic grants that Jesus was crucified but doubts the empty tomb. How should the course respond?",
      "opts": [
        "Say the two claims have identical historical support.",
        "Acknowledge that the empty tomb is more debated and make the resurrection case cumulatively rather than hiding that difference.",
        "Say the resurrection cannot be argued without the empty tomb.",
        "Treat doubt about the tomb as irrational."
      ],
      "a": 1,
      "exp": "Clear apologetics distinguishes stronger and weaker historical claims rather than flattening them into equal certainty."
    },
    {
      "q": "A natural explanation accounts for one resurrection fact but leaves the others untouched. What should you ask?",
      "opts": [
        "Whether it is imaginable.",
        "Whether it explains the full pattern with evidence rather than added guesses.",
        "Whether it avoids all supernatural language.",
        "Whether it is popular online."
      ],
      "a": 1,
      "exp": "Inference to the best explanation compares explanatory reach, fit, and unsupported additions."
    },
    {
      "q": "Why does adding “legend” improve the liar-lunatic-Lord discussion?",
      "opts": [
        "It guarantees Christianity is false.",
        "It makes the options more historically fair and forces the legend hypothesis to face the early-source evidence.",
        "It turns the trilemma into a mathematical proof.",
        "It removes the need to discuss Jesus’ claims."
      ],
      "a": 1,
      "exp": "The broadened argument avoids a false dilemma and then tests each option historically."
    },
    {
      "q": "Suppose God raised Jesus after Jesus made extraordinary claims. What is the classical apologetic inference?",
      "opts": [
        "God has likely vindicated Jesus as an authorized messenger and Lord.",
        "Every later church statement is therefore inspired.",
        "Miracles are now common natural events.",
        "No further argument is needed about Scripture."
      ],
      "a": 0,
      "exp": "Resurrection in the context of Jesus’ claims gives strong reason to see God as authenticating Jesus."
    },
    {
      "q": "Why is the move from Jesus’ authority to Scripture not simply circular?",
      "opts": [
        "Because the New Testament was first used as historical evidence rather than assumed to be inspired.",
        "Because circular arguments are acceptable in religion.",
        "Because manuscript numbers prove inspiration.",
        "Because Jesus wrote every biblical book."
      ],
      "a": 0,
      "exp": "The course distinguishes using documents historically from later concluding that they belong to authoritative revelation."
    },
    {
      "q": "Jesus says Scripture cannot be broken and repeatedly treats written Scripture as God speaking. What conclusion is most directly supported?",
      "opts": [
        "Every modern interpretation is correct.",
        "Jesus held a high view of the divine authority of Israel’s Scriptures.",
        "Jesus named the exact later Protestant canon.",
        "The Old Testament contains no difficult passages."
      ],
      "a": 1,
      "exp": "The evidence establishes Jesus’ view of Scripture while leaving separate canon and interpretation questions to be handled carefully."
    },
    {
      "q": "Why is “Jesus named all 27 New Testament books” a weak claim?",
      "opts": [
        "Because the New Testament has more than 27 books.",
        "Because Jesus instead authorized apostles and the completed canon was recognized through a later historical process.",
        "Because apostles had no authority.",
        "Because canon history has no evidence."
      ],
      "a": 1,
      "exp": "The stronger argument is Christ → apostles → apostolic writings and recognition, not an anachronistic claim about a completed table of contents."
    },
    {
      "q": "What is the final logical step once Scripture is reasonably received as God’s Word?",
      "opts": [
        "God is truthful, so what God reveals is true, while human interpretation still requires care.",
        "Every translation and interpretation is infallible.",
        "No further study is necessary.",
        "Only the parts we already agree with are authoritative."
      ],
      "a": 0,
      "exp": "Divine truthfulness grounds confidence in revelation without turning readers or interpreters into infallible authorities."
    }
  ]
};