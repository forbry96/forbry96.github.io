practiceScenarios.splice(0, practiceScenarios.length, ...[
  {
    "id": "createdgod",
    "level": "guided",
    "title": "Who created God?",
    "diagnose": "If everything needs a cause, who caused God? It seems like you are making an exception for the answer you want.",
    "entryKey": "step1",
    "entry": "Step 1, but first correct the argument. The course never says that everything without exception needs a cause.",
    "diagnoseWhy": "The objection is aimed at a cosmological argument. Before defending God, make sure the premise is stated correctly, then distinguish a contingent reality from a necessary one.",
    "nodes": {
      "start": {
        "speaker": "Friend",
        "text": "If everything needs a cause, who caused God? It seems like you are making an exception for the answer you want.",
        "options": [
          {
            "text": "God is eternal, so he does not need a cause.",
            "next": "special",
            "grade": "mixed",
            "note": "True as far as it goes, but it lets the bad premise stand. The first job is to correct what the argument actually says."
          },
          {
            "text": "I would state the argument more carefully. It is not that everything needs a cause. Things that begin to exist need a cause, and contingent things need an explanation.",
            "next": "special",
            "grade": "strong",
            "note": "Good. You corrected the premise before defending the conclusion."
          },
          {
            "text": "The universe began to exist, while God did not, so they are not in the same category.",
            "next": "special",
            "grade": "mixed",
            "note": "This works better for Kalam than for contingency. It may be useful, but it still helps to name the premise clearly."
          }
        ]
      },
      "special": {
        "speaker": "Friend",
        "text": "That still sounds like special pleading. You are saying everything else needs an explanation, then God gets a pass.",
        "options": [
          {
            "text": "Not quite. A necessary reality is not an exception added after the fact. It is the kind of reality the argument says you eventually need if dependent things are going to have an ultimate explanation.",
            "next": "universe",
            "grade": "strong",
            "note": "Good. You explained why necessity is part of the conclusion rather than a convenient exemption."
          },
          {
            "text": "Every explanation has to stop somewhere, so I think it makes sense to stop with God.",
            "next": "universe",
            "grade": "mixed",
            "note": "There is something right here, but “we have to stop somewhere” does not yet show why the stopping point should be necessary rather than arbitrary."
          },
          {
            "text": "God is different because God is the Creator, not part of creation.",
            "next": "universe",
            "grade": "mixed",
            "note": "That is Christianly true, but with someone who has not granted the conclusion yet, it mostly restates the claim."
          }
        ]
      },
      "universe": {
        "speaker": "Friend",
        "text": "Why can’t the universe itself be the necessary thing? Why add God?",
        "options": [
          {
            "text": "That is the right question. I would compare the universe we actually have, changing, made of parts, and describable in contingent physical conditions, with what a necessary ultimate explanation would have to be like.",
            "next": "goodend",
            "grade": "strong",
            "note": "Good. You did not merely repeat “God is necessary.” You turned to the explanatory comparison the argument actually requires."
          },
          {
            "text": "Because the Big Bang shows the universe had a beginning.",
            "next": "goodend",
            "grade": "mixed",
            "note": "A beginning matters for Kalam, but this question is about necessity. Do not switch arguments unless you mean to."
          },
          {
            "text": "Because nothing physical can be necessary.",
            "next": "goodend",
            "grade": "mixed",
            "note": "That may be part of a larger argument, but stated this quickly it sounds asserted rather than shown."
          }
        ]
      },
      "goodend": {
        "end": true,
        "summary": "The main skill here is not memorizing “God does not need a cause.” It is hearing the bad premise, correcting it, and then explaining why a necessary reality is being argued for rather than simply assumed."
      }
    },
    "build": {
      "prompt": "A coworker says, “Christians say everything needs a cause until I ask who caused God. Then suddenly the rule changes.” How would you answer without appealing to the Bible as your first move?",
      "followUps": [
        "He replies, “Fine, but necessary being just sounds like a label you invented so God can escape the rule.”",
        "He then asks, “Why not just say the universe is necessary and stop there?”"
      ],
      "models": [
        "I would first correct the premise. The argument is not that everything needs a cause. Kalam says things that begin to exist need causes, and contingency arguments ask why dependent things exist at all. God is not being added as an exception to “everything needs a cause.”",
        "A necessary reality is not supposed to be a loophole. It is the kind of reality the argument says would be required if the chain of dependent explanations is going to terminate in something that is not itself dependent in the same way.",
        "That is a fair question. Then we have to compare the universe we actually have with what a necessary ultimate reality would have to be like, rather than simply calling the universe necessary because we want the regress to stop."
      ],
      "studies": "Studies 3–4, especially contingency and Kalam",
      "studyId": 4
    }
  },
  {
    "id": "morality",
    "level": "guided",
    "title": "You can be good without God",
    "diagnose": "I know atheists who are kinder than Christians I know. So I do not see why morality needs God.",
    "entryKey": "step1",
    "entry": "Step 1, moral argument. Separate moral behavior from the question of what grounds objective moral duties and value.",
    "diagnoseWhy": "The claim moves from “atheists can behave morally” to “therefore morality does not need God.” Those are different questions.",
    "nodes": {
      "start": {
        "speaker": "Friend",
        "text": "I know atheists who are kinder than Christians I know. So I do not see why morality needs God.",
        "options": [
          {
            "text": "I agree that atheists can be kind, brave, and morally serious. The argument is not about who can behave well. It is about what makes moral duties objectively true in the first place.",
            "next": "basic",
            "grade": "strong",
            "note": "Good. You conceded what should be conceded and kept the argument on grounding."
          },
          {
            "text": "Christians fail morally too, but that does not make Christianity false.",
            "next": "basic",
            "grade": "mixed",
            "note": "True, but it answers hypocrisy more than the grounding claim."
          },
          {
            "text": "Even atheists usually live as if some things are really right and wrong.",
            "next": "basic",
            "grade": "mixed",
            "note": "Potentially useful, but it still needs the distinction between knowing moral truths and grounding them."
          }
        ]
      },
      "basic": {
        "speaker": "Friend",
        "text": "Why can’t moral facts just be basic facts about reality? Maybe cruelty is wrong, full stop.",
        "options": [
          {
            "text": "That is a real proposal. The question is whether brute moral facts explain obligation, human worth, and why those facts have authority over persons better than a personal moral source does.",
            "next": "euth",
            "grade": "strong",
            "note": "Good. You treated the alternative as an actual position rather than pretending atheism has no answer."
          },
          {
            "text": "Because facts cannot tell you what you ought to do.",
            "next": "euth",
            "grade": "mixed",
            "note": "There is a real is/ought issue here, but this is too compressed. Moral realism has more sophisticated versions than this answer allows."
          },
          {
            "text": "Because without God morality would just be opinion.",
            "next": "euth",
            "grade": "mixed",
            "note": "This states the conclusion, but does not yet argue for it."
          }
        ]
      },
      "euth": {
        "speaker": "Friend",
        "text": "Then is something good just because God commands it? That sounds arbitrary.",
        "options": [
          {
            "text": "I would not say goodness is arbitrary or external to God. In classical Christian thought, God commands in accord with his good nature. The argument is about moral reality being grounded in who God is, not random commands.",
            "next": "goodend",
            "grade": "strong",
            "note": "Good. You avoided both horns of the simplistic dilemma and stated the Christian position clearly."
          },
          {
            "text": "God made us, so he gets to decide the rules.",
            "next": "goodend",
            "grade": "mixed",
            "note": "Creator authority matters, but by itself this can sound like sheer power makes right."
          },
          {
            "text": "Whatever God commands is good by definition.",
            "next": "goodend",
            "grade": "mixed",
            "note": "This risks making morality sound arbitrary unless you connect commands to God’s character."
          }
        ]
      },
      "goodend": {
        "end": true,
        "summary": "The learner should be able to concede atheist moral behavior, distinguish behavior from grounding, and then explain the Christian claim without pretending secular moral realism has no serious form."
      }
    },
    "build": {
      "prompt": "A friend says, “My atheist neighbor is a better person than half the Christians I know. That alone shows you do not need God for morality.” Answer the point he actually made.",
      "followUps": [
        "He says, “Okay, but why can’t right and wrong just be objective facts built into reality?”",
        "Then he asks, “Doesn’t saying morality comes from God just mean whatever God says becomes good?”"
      ],
      "models": [
        "I would agree that atheists can behave morally. The moral argument is not that you need to believe in God before you can know or do good. It asks a different question, what makes objective moral duties and human value true at all.",
        "That is a serious alternative. Then the discussion becomes which worldview gives the better account of objective obligation, value, and persons, rather than pretending secular moral realism is not an option.",
        "The Christian claim is not that God invents goodness by arbitrary commands. God’s commands express his good character, so moral reality is grounded personally without making goodness independent of God or merely whatever a powerful being happens to prefer."
      ],
      "studies": "Study 8, moral argument",
      "studyId": 8
    }
  },
  {
    "id": "miracles",
    "level": "guided",
    "title": "Dead people stay dead",
    "diagnose": "You can give me all the resurrection evidence you want, but dead people do not come back. That is just not how the world works.",
    "entryKey": "bridge",
    "entry": "Miracle bridge. Before weighing resurrection evidence, find out whether the person is treating miracles as merely unusual or impossible in principle.",
    "diagnoseWhy": "The statement sounds historical, but it may contain a prior philosophical rule that excludes divine action before the history is considered.",
    "nodes": {
      "start": {
        "speaker": "Friend",
        "text": "You can give me all the resurrection evidence you want, but dead people do not come back. That is just not how the world works.",
        "options": [
          {
            "text": "Normally, I agree. The question is whether you mean resurrection is naturally impossible, or that even God could not raise someone if God exists.",
            "next": "supernatural",
            "grade": "strong",
            "note": "Good. You kept the ordinary biological fact while exposing the deeper assumption."
          },
          {
            "text": "That is exactly why the resurrection would be a miracle.",
            "next": "supernatural",
            "grade": "mixed",
            "note": "True, but it does not yet tell you whether the person has ruled miracles out in principle."
          },
          {
            "text": "The disciples were convinced they saw Jesus alive, so we still have to explain that.",
            "next": "supernatural",
            "grade": "mixed",
            "note": "Historical evidence matters later. First find out whether the person will allow miraculous explanations onto the table at all."
          }
        ]
      },
      "supernatural": {
        "speaker": "Friend",
        "text": "I just do not think supernatural explanations should ever count. Once you allow miracles, you can explain anything.",
        "options": [
          {
            "text": "I would not use a miracle to explain anything I cannot explain. I would first ask whether there is independent reason to believe God exists. If there is, divine action cannot be ruled out by definition, and individual miracle claims still need evidence.",
            "next": "gaps",
            "grade": "strong",
            "note": "Good. This keeps miracles evidentially constrained rather than turning them into a gap filler."
          },
          {
            "text": "Science cannot test God, so science cannot rule miracles out.",
            "next": "gaps",
            "grade": "mixed",
            "note": "Useful but incomplete. The stronger move is to connect miracle possibility to the prior case for God and then return to historical evidence."
          },
          {
            "text": "If God exists, miracles are possible.",
            "next": "gaps",
            "grade": "mixed",
            "note": "Correct, but too compressed by itself. The person’s worry about explaining anything still needs an answer."
          }
        ]
      },
      "gaps": {
        "speaker": "Friend",
        "text": "So whenever something is unlikely, you can just say God did it?",
        "options": [
          {
            "text": "No. “God could do it” only removes an a priori veto. It does not establish that God did it. We would still have to ask what the historical evidence is and which explanation best fits it.",
            "next": "goodend",
            "grade": "strong",
            "note": "Good. You clearly separated possibility from proof."
          },
          {
            "text": "Not whenever it is unlikely, only when the event has religious significance.",
            "next": "goodend",
            "grade": "mixed",
            "note": "Religious context matters, but significance alone is not enough. Evidence still has to do real work."
          },
          {
            "text": "If an event is impossible naturally, then God is the best explanation.",
            "next": "goodend",
            "grade": "mixed",
            "note": "This moves too fast from a natural limit to a divine conclusion."
          }
        ]
      },
      "goodend": {
        "end": true,
        "summary": "The bridge does one job. It stops someone from ruling miracles out before the evidence is heard. It does not prove a particular miracle merely by making one possible."
      }
    },
    "build": {
      "prompt": "Someone says, “I do not care how many people claimed to see Jesus. Dead people stay dead, so I know the resurrection did not happen.” What do you say first?",
      "followUps": [
        "He answers, “I just do not think supernatural explanations belong in serious reasoning.”",
        "Then he says, “If you let God into the explanation, you can explain any weird thing by saying miracle.”"
      ],
      "models": [
        "I would agree that dead people stay dead under ordinary natural conditions. Then I would ask whether he means resurrection is naturally impossible or impossible even if God exists. Those are not the same claim.",
        "Then the deeper issue is whether God exists. If there is independent reason for God, divine action cannot simply be excluded by definition. That still does not prove any miracle claim.",
        "Exactly, which is why I would not call something a miracle just because it is strange or unexplained. The prior case for God makes divine action possible, then the historical evidence has to carry the claim that God actually acted here."
      ],
      "studies": "Study 10, miracle bridge, then Studies 13–16",
      "studyId": 10
    }
  },
  {
    "id": "science",
    "level": "applied",
    "title": "Science keeps explaining more",
    "diagnose": "I am not saying science has disproved God. I just notice that the more science explains, the less work there seems to be for God to do.",
    "entryKey": "clarify",
    "entry": "Ask first. This could be a claim about what counts as knowledge, a naturalism claim, or a “God of the gaps” concern. Do not pick an argument until you know which one he means.",
    "diagnoseWhy": "The sentence can point in more than one direction. The right first move is clarification, not guessing.",
    "nodes": {
      "start": {
        "speaker": "Friend",
        "text": "I am not saying science has disproved God. I just notice that the more science explains, the less work there seems to be for God to do.",
        "options": [
          {
            "text": "When you say “less work for God,” do you mean natural explanations make God unnecessary, or that Christians only put God where science has not explained something yet?",
            "next": "natural",
            "grade": "strong",
            "note": "Good. You separated two different objections before answering either one."
          },
          {
            "text": "Science explains how things work, while God explains why there is a universe in the first place.",
            "next": "natural",
            "grade": "mixed",
            "note": "A useful distinction, but you answered before confirming what he meant."
          },
          {
            "text": "A scientific explanation and a divine explanation do not have to compete.",
            "next": "natural",
            "grade": "mixed",
            "note": "Also useful, but it is still better to clarify the exact claim first."
          }
        ]
      },
      "natural": {
        "speaker": "Friend",
        "text": "Mostly I mean natural explanations make God unnecessary. If the causes are all inside nature, why add another cause?",
        "options": [
          {
            "text": "Because explaining a process inside the universe is not the same as explaining why that whole system exists, has the powers it has, or is intelligible in the first place. Those are different explanatory questions.",
            "next": "brute",
            "grade": "strong",
            "note": "Good. You did not attack science, you distinguished levels of explanation."
          },
          {
            "text": "Because God is the cause behind every natural cause.",
            "next": "brute",
            "grade": "mixed",
            "note": "This may be true, but it sounds like an added assertion unless you give a reason for it."
          },
          {
            "text": "Science cannot answer ultimate questions.",
            "next": "brute",
            "grade": "mixed",
            "note": "Often true in part, but too broad. Some “ultimate” questions overlap with cosmology and philosophy, so be precise."
          }
        ]
      },
      "brute": {
        "speaker": "Friend",
        "text": "Why cannot the universe and its laws just be the brute fact? Maybe there is no deeper why.",
        "options": [
          {
            "text": "That is possible as a stopping point, but it is not an explanation. Then we can compare whether a brute physical reality or a necessary rational source better explains contingent existence, order, and intelligibility.",
            "next": "gap",
            "grade": "strong",
            "note": "Good. You treated brute fact as a real option and moved to explanatory comparison."
          },
          {
            "text": "Because everything has to have a reason.",
            "next": "gap",
            "grade": "mixed",
            "note": "This needs careful defense. Do not smuggle in a premise stronger than the course has established."
          },
          {
            "text": "Because the universe looks designed.",
            "next": "gap",
            "grade": "mixed",
            "note": "Design may become relevant, but this question began with contingency and explanation. Stay on one issue."
          }
        ]
      },
      "gap": {
        "speaker": "Friend",
        "text": "I can respect that more. I just do not want God used as a plug for whatever science has not figured out yet.",
        "options": [
          {
            "text": "Neither do I. The case I am making is not “we do not know this mechanism, therefore God.” It is that even a fully described natural mechanism still leaves larger metaphysical questions about why this reality exists and what best explains it.",
            "next": "goodend",
            "grade": "strong",
            "note": "Good. You accepted the legitimate concern and showed why the argument is not a gap argument."
          },
          {
            "text": "There will always be things science cannot explain.",
            "next": "goodend",
            "grade": "mixed",
            "note": "Probably, but that would leave you leaning on gaps again, which is exactly the concern he raised."
          },
          {
            "text": "Scientists also make assumptions they cannot prove.",
            "next": "goodend",
            "grade": "mixed",
            "note": "That can be discussed, but here it sounds like a counterattack rather than an answer."
          }
        ]
      },
      "goodend": {
        "end": true,
        "summary": "This scenario should train the learner not to fight science. The issue is whether natural mechanisms answer every explanatory question, and whether the Christian case is being built from positive reasons rather than gaps."
      }
    },
    "build": {
      "prompt": "A friend says, “I do not think science disproves God. I just think every time science explains something, there is one less reason to bring God into it.” Respond without sounding anti-science.",
      "followUps": [
        "He says, “Okay, but why can’t the universe and its laws just be the stopping point?”",
        "Then he adds, “I mainly do not want God used to fill whatever science has not explained yet.”"
      ],
      "models": [
        "I would ask what he thinks God is supposed to explain. A natural mechanism can explain how one physical event produces another without answering why the whole contingent system exists or why it is intelligible. Those are different questions, not competing versions of the same scientific explanation.",
        "He can take the universe as a brute fact, but then that is where explanation stops rather than where it succeeds. The real comparison is whether brute physical reality or a necessary source gives the better account of why anything contingent exists at all.",
        "I agree with that concern. I would not argue “science has a gap, therefore God.” The classical case is meant to use positive arguments about existence, order, reason, morality, and then history, not ignorance about a mechanism."
      ],
      "studies": "Studies 1–7, especially standards of evidence, contingency, and design",
      "studyId": 3
    }
  },
  {
    "id": "eternal",
    "level": "applied",
    "title": "Maybe the universe never began",
    "diagnose": "Even if the Big Bang describes our observable universe, maybe reality itself has always existed in some form. Then why do I need a Creator?",
    "entryKey": "step1",
    "entry": "Step 1, but contingency is the cleaner first move. An eternal physical reality would still raise the question of dependence and necessity.",
    "diagnoseWhy": "The objection tries to block Kalam by denying a first beginning. The course has another route: ask whether eternal duration would make physical reality necessary or self-explanatory.",
    "nodes": {
      "start": {
        "speaker": "Friend",
        "text": "Even if the Big Bang describes our observable universe, maybe reality itself has always existed in some form. Then why do I need a Creator?",
        "options": [
          {
            "text": "Even if physical reality had no first moment, would that make it necessary and self-existent, or could it still be the kind of reality that needs an explanation?",
            "next": "always",
            "grade": "strong",
            "note": "Good. You did not make the whole case depend on one cosmological model."
          },
          {
            "text": "Most cosmologists still think the universe had a beginning.",
            "next": "always",
            "grade": "mixed",
            "note": "Scientific evidence matters, but this lets the argument stand or fall with a debated model."
          },
          {
            "text": "An infinite past is impossible.",
            "next": "always",
            "grade": "mixed",
            "note": "There are philosophical arguments here, but you do not need to take that harder route first."
          }
        ]
      },
      "always": {
        "speaker": "Friend",
        "text": "If it was always there, I do not see why it needs anything outside itself.",
        "options": [
          {
            "text": "“Always there” answers how long it existed, not whether it exists necessarily. A train could have infinitely many cars and still have each car dependent. Duration and dependence are different questions.",
            "next": "godeternal",
            "grade": "strong",
            "note": "Good. You isolated the conceptual distinction the objection misses."
          },
          {
            "text": "Because eternal matter still cannot create itself.",
            "next": "godeternal",
            "grade": "mixed",
            "note": "Self-creation is not really the issue if the proposal is that it never began."
          },
          {
            "text": "Because only God can be eternal.",
            "next": "godeternal",
            "grade": "mixed",
            "note": "That assumes the conclusion instead of arguing toward it."
          }
        ]
      },
      "godeternal": {
        "speaker": "Friend",
        "text": "But then you say God is eternal and suddenly eternity is enough for him.",
        "options": [
          {
            "text": "Eternity by itself is not enough for God either. The claim is that the ultimate explanation must be necessary rather than dependent. Eternity and necessity are not the same property.",
            "next": "goodend",
            "grade": "strong",
            "note": "Good. You applied the same standard to God rather than changing the rules."
          },
          {
            "text": "God is different because he is immaterial.",
            "next": "goodend",
            "grade": "mixed",
            "note": "Immateriality may matter later, but it does not by itself answer the charge about eternity."
          },
          {
            "text": "God is eternal by definition.",
            "next": "goodend",
            "grade": "mixed",
            "note": "Definitions do not establish that anything actually exists."
          }
        ]
      },
      "goodend": {
        "end": true,
        "summary": "The main skill is keeping eternity and necessity separate. An eternal universe would not automatically defeat contingency, and calling God eternal is not what does the explanatory work."
      }
    },
    "build": {
      "prompt": "Someone says, “Maybe there was never a first moment. Maybe the cosmos, multiverse, quantum field, or whatever is basic has simply always existed. Then creation is unnecessary.”",
      "followUps": [
        "He says, “If something has always existed, what would it still need an explanation for?”",
        "Then he says, “But you also believe God has always existed, so why does eternity work for God but not the universe?”"
      ],
      "models": [
        "I would not make everything depend on proving a first moment. Even if physical reality had always existed, we can still ask whether it exists necessarily or contingently, and why that kind of reality exists at all.",
        "Existing forever is about duration. It does not automatically make something necessary or self-explanatory. The contingency question is whether the thing could have failed to exist or could have been otherwise, not simply how long it has been there.",
        "I would apply the same standard to God. Eternity alone does not do the work. The classical claim is that the ultimate explanation must be necessary and nondependent, not merely old without beginning."
      ],
      "studies": "Study 3 first, then Study 4",
      "studyId": 3
    }
  },
  {
    "id": "religions",
    "level": "applied",
    "title": "Every religion says it is true",
    "diagnose": "Christians say Christianity is true. Muslims say Islam is true. Other religions say the same thing. From the outside it just looks like everybody is certain about their own tradition.",
    "entryKey": "clarify",
    "entry": "Ask first. Religious disagreement by itself does not tell you whether the person means truth is unknowable, all religions are basically the same, or there is no fair way to compare them.",
    "diagnoseWhy": "The surface claim is religious diversity. The real objection could be epistemic, pluralist, historical, or emotional. Clarify before launching into Christianity.",
    "nodes": {
      "start": {
        "speaker": "Friend",
        "text": "Christians say Christianity is true. Muslims say Islam is true. Other religions say the same thing. From the outside it just looks like everybody is certain about their own tradition.",
        "options": [
          {
            "text": "What do you think follows from the disagreement, that none of them can be known, or that there is no fair way to compare their claims?",
            "next": "proof",
            "grade": "strong",
            "note": "Good. You did not assume what conclusion he was drawing from religious diversity."
          },
          {
            "text": "They cannot all be true because they make contradictory claims.",
            "next": "proof",
            "grade": "mixed",
            "note": "Important, but this only shows they are not all true in the same sense. It does not yet answer whether one can be known."
          },
          {
            "text": "Christianity is different because it is based on history.",
            "next": "proof",
            "grade": "mixed",
            "note": "This may become the case you make, but first find out what the objection actually is."
          }
        ]
      },
      "proof": {
        "speaker": "Friend",
        "text": "I mean how could I ever know which one is right? Everybody has arguments.",
        "options": [
          {
            "text": "We do not need to compare every religion all at once. We can start with shared questions, whether God exists and what God would be like, then test Christianity where it makes public historical claims about Jesus.",
            "next": "birth",
            "grade": "strong",
            "note": "Good. You gave a manageable method instead of pretending the diversity itself is simple."
          },
          {
            "text": "Christianity has better evidence than the others.",
            "next": "birth",
            "grade": "mixed",
            "note": "Maybe, but this is a conclusion. The learner should show how the comparison can be made."
          },
          {
            "text": "You just have to examine each religion objectively.",
            "next": "birth",
            "grade": "mixed",
            "note": "Fair principle, but too vague to be useful."
          }
        ]
      },
      "birth": {
        "speaker": "Friend",
        "text": "But you were raised Christian. A Muslim raised somewhere else would start from Islam. Does that not show belief is mostly geography?",
        "options": [
          {
            "text": "Upbringing clearly influences what people first believe, including Christians. But explaining how someone came to hold a belief is different from showing whether the belief is true. We still have to test the claim and evidence.",
            "next": "goodend",
            "grade": "strong",
            "note": "Good. You conceded the sociology without confusing origin of belief with truth of belief."
          },
          {
            "text": "Plenty of people convert to Christianity from other religions.",
            "next": "goodend",
            "grade": "mixed",
            "note": "True, but conversion examples do not by themselves answer the general point about cultural influence."
          },
          {
            "text": "Everyone has biases, so geography proves nothing.",
            "next": "goodend",
            "grade": "mixed",
            "note": "The conclusion is too quick. Better to distinguish causal origin from truth directly."
          }
        ]
      },
      "goodend": {
        "end": true,
        "summary": "The learner should not answer “many religions” with “mine is obviously right.” Clarify what the disagreement is supposed to show, then move to testable claims and shared standards of reasoning."
      }
    },
    "build": {
      "prompt": "A friend says, “Of course you think Christianity is true. You grew up around Christians. A Muslim in Saudi Arabia thinks Islam is true for the same reason. That makes all this certainty hard to take seriously.”",
      "followUps": [
        "He says, “So how could anyone actually compare religions without just favoring the one they started with?”",
        "Then he says, “But every religion has smart people and arguments on its side.”"
      ],
      "models": [
        "I would agree that upbringing influences what people first believe. That is true for Christians too. But the cause of a belief and the truth of a belief are different questions. We still have to ask whether the claims are actually supported.",
        "I would not try to compare every detail of every religion at once. Start with larger questions such as whether God exists and what follows from that, then test Christianity at its public historical claims about Jesus and the resurrection.",
        "Smart disagreement should make us careful, not hopeless. The fact that intelligent people disagree means we need to look at arguments and evidence rather than count confident people. Disagreement by itself does not settle which claim is true."
      ],
      "studies": "Studies 1–2, then the Step 1 and Step 2 sequence",
      "studyId": 2
    }
  },
  {
    "id": "legend",
    "level": "pressure",
    "title": "Maybe the resurrection story grew",
    "diagnose": "I can believe Jesus existed and was crucified. I just think the resurrection story grew after his death the way stories about important people often do.",
    "entryKey": "step2",
    "entry": "Step 2, historical evidence. Theism and Jesus’ existence are already granted, so go straight to how early the resurrection proclamation appears and then compare explanations.",
    "diagnoseWhy": "Do not restart with God’s existence. The actual disagreement is whether the resurrection claim is early enough and historically grounded enough to resist a simple legend-development explanation.",
    "nodes": {
      "start": {
        "speaker": "Friend",
        "text": "I can believe Jesus existed and was crucified. I just think the resurrection story grew after his death the way stories about important people often do.",
        "options": [
          {
            "text": "That is possible in principle, so I would start with how early the resurrection claim appears rather than just saying legends could not develop. Paul is already passing on resurrection tradition very early.",
            "next": "paul",
            "grade": "strong",
            "note": "Good. You met the historical hypothesis directly and avoided an absolute claim about legends."
          },
          {
            "text": "The Gospels are too early for a legend to grow.",
            "next": "paul",
            "grade": "mixed",
            "note": "The basic instinct is relevant, but “too early” is stronger than the evidence warrants by itself."
          },
          {
            "text": "The disciples would not die for something they invented.",
            "next": "paul",
            "grade": "mixed",
            "note": "Sincerity may matter against deliberate fraud, but legend development is a different hypothesis."
          }
        ]
      },
      "paul": {
        "speaker": "Friend",
        "text": "Paul did not follow Jesus during his ministry. Why should his letters settle what happened?",
        "options": [
          {
            "text": "Paul does not settle everything by himself. The point is that his letters give us very early evidence that resurrection belief was already central, and he reports traditions he says he received rather than invented. Then we compare that with the wider evidence.",
            "next": "creed",
            "grade": "strong",
            "note": "Good. You stated what Paul can establish without making him do more than he can."
          },
          {
            "text": "Paul met Peter and James, so he knew the eyewitnesses and that settles it.",
            "next": "creed",
            "grade": "mixed",
            "note": "His contacts matter, but “settles it” overclaims what those meetings alone prove."
          },
          {
            "text": "Paul was an apostle, so his testimony is authoritative.",
            "next": "creed",
            "grade": "mixed",
            "note": "That is a theological claim. In a historical argument, first use the letter as early evidence without presupposing inspiration."
          }
        ]
      },
      "creed": {
        "speaker": "Friend",
        "text": "People always call 1 Corinthians 15 an early creed. How do you know it was not something Paul made up and then called tradition?",
        "options": [
          {
            "text": "I would not pretend we can put an exact date on every line. The case comes from the language of receiving and passing on tradition, Paul’s chronology, and his contact with earlier leaders. It supports an early pre-Pauline tradition, but I would state the dating with appropriate caution.",
            "next": "gospels",
            "grade": "strong",
            "note": "Good. You used the evidence while admitting the limit."
          },
          {
            "text": "All scholars date it within a few years of the resurrection.",
            "next": "gospels",
            "grade": "mixed",
            "note": "Consensus language can be useful, but this is too sweeping and substitutes a slogan for the reasons."
          },
          {
            "text": "Because Paul would not lie about receiving it.",
            "next": "gospels",
            "grade": "mixed",
            "note": "Possible sincerity is not enough. Use the textual and historical reasons."
          }
        ]
      },
      "gospels": {
        "speaker": "Friend",
        "text": "Even if resurrection belief was early, an early belief can still be false.",
        "options": [
          {
            "text": "I agree. Earliness does not prove resurrection. It weakens the claim that resurrection belief arose only after a long legendary development. Then we still have to ask what explains the appearances, the bodily claim, the tomb evidence, and the rise of that belief.",
            "next": "goodend",
            "grade": "strong",
            "note": "Good. You conceded the exact limit of the argument and moved to the cumulative case."
          },
          {
            "text": "But an early belief is much more likely to be true.",
            "next": "goodend",
            "grade": "mixed",
            "note": "Sometimes, but earliness alone does not give you that much. Keep the inference narrow."
          },
          {
            "text": "The apostles were there, so an early false belief could not survive.",
            "next": "goodend",
            "grade": "mixed",
            "note": "Too confident. Early communities can hold false beliefs. The case needs evidence, not just proximity."
          }
        ]
      },
      "goodend": {
        "end": true,
        "summary": "The pressure here is to avoid turning one useful fact into the whole resurrection case. Early proclamation answers a late-legend theory, but the resurrection conclusion comes from the cumulative evidence."
      }
    },
    "build": {
      "prompt": "A skeptical relative says, “I am fine with Jesus existing and dying. The resurrection is the kind of story followers add later when a movement wants its founder to be special.” Give a historical response without assuming the New Testament is inspired.",
      "followUps": [
        "He says, “Why should Paul matter? He was not one of Jesus’ original followers.”",
        "Then he says, “Even if people believed resurrection early, people can believe false things early.”"
      ],
      "models": [
        "I would start with the timing. Resurrection belief is not something we first see centuries later. Paul’s undisputed letters already show it at the center of the movement very early, and he passes on traditions he says he received. That does not prove resurrection by itself, but it makes a simple long-term legend-growth account harder to fit.",
        "Paul matters here as an early historical source, not because I need you to assume he is inspired. He knew and interacted with earlier leaders, and his letters preserve what Christians were proclaiming within the first generation.",
        "I agree completely. Early belief can be false. The point of the early material is narrower: it challenges the idea that resurrection belief only developed much later. Then we still have to compare explanations of the appearances, the bodily claim, the tomb evidence, and the rise of the movement."
      ],
      "studies": "Studies 11, 13–16",
      "studyId": 13
    }
  },
  {
    "id": "evil",
    "level": "pressure",
    "title": "Why would God let this happen?",
    "diagnose": "My sister lost a baby. I do not want a lecture about free will. I cannot see how a loving God can watch something like that happen.",
    "entryKey": "clarify",
    "entry": "Ask first, and be human. This may be an evidential objection, a logical claim, grief that does not need an argument yet, or some combination of them.",
    "diagnoseWhy": "A philosophical answer can be correct and still be the wrong first response. Find out what kind of conversation this is before treating pain like a syllogism.",
    "nodes": {
      "start": {
        "speaker": "Friend",
        "text": "My sister lost a baby. I do not want a lecture about free will. I cannot see how a loving God can watch something like that happen.",
        "options": [
          {
            "text": "I am really sorry. I am not going to pretend I know why that happened. Do you want to talk about whether suffering counts against God, or do you mostly need me to hear how awful this has been?",
            "next": "evidence",
            "grade": "strong",
            "note": "Good. You acknowledged the person and clarified whether an argument is even appropriate."
          },
          {
            "text": "I do not know why God allowed that, but Christianity does not teach that suffering is good or easy.",
            "next": "evidence",
            "grade": "mixed",
            "note": "Compassionate and true, though it still does not ask what he needs from the conversation."
          },
          {
            "text": "The Christian answer is that God can have morally sufficient reasons we do not know.",
            "next": "evidence",
            "grade": "mixed",
            "note": "This may become relevant philosophically, but as a first response it risks treating grief as an abstract puzzle."
          }
        ]
      },
      "evidence": {
        "speaker": "Friend",
        "text": "I mean both. I am angry, but I also really do think suffering like this makes God less believable.",
        "options": [
          {
            "text": "That makes sense as an evidential question. I would not argue that your pain is not evidence. I would ask what conclusion it supports, how strongly it supports it, and how it weighs against the rest of the case for God.",
            "next": "hidden",
            "grade": "strong",
            "note": "Good. You did not dismiss the evidence or pretend one observation settles the whole worldview."
          },
          {
            "text": "The existence of evil actually proves God because evil requires objective morality.",
            "next": "hidden",
            "grade": "mixed",
            "note": "The moral argument can be relevant, but using it here as a quick reversal misses the evidential force of the objection."
          },
          {
            "text": "God can bring good out of suffering, so suffering does not count against him.",
            "next": "hidden",
            "grade": "mixed",
            "note": "Possible redemption does not erase the evidential question, and you do not know God’s particular reason here."
          }
        ]
      },
      "hidden": {
        "speaker": "Friend",
        "text": "Isn’t “God has reasons we cannot see” just an escape hatch? You could say that no matter how much suffering there was.",
        "options": [
          {
            "text": "It could become an escape hatch if I used it to make every amount of suffering irrelevant. I would use it more narrowly: our not seeing a sufficient reason does not by itself prove there is none. The amount and kinds of suffering still have to be weighed as evidence.",
            "next": "pastoral",
            "grade": "strong",
            "note": "Good. You preserved the logical point without making the worldview unfalsifiable by definition."
          },
          {
            "text": "We are finite and God is infinite, so of course we cannot understand his reasons.",
            "next": "pastoral",
            "grade": "mixed",
            "note": "There is a theological truth here, but it can be used too broadly and make the evidential objection disappear by fiat."
          },
          {
            "text": "Every worldview has mysteries, so Christianity is allowed to have this one.",
            "next": "pastoral",
            "grade": "mixed",
            "note": "True in a general sense, but it does not yet answer how much evidential weight suffering should carry."
          }
        ]
      },
      "pastoral": {
        "speaker": "Friend",
        "text": "I still hate that answer. It sounds like I am being told to accept something horrible because God must know better.",
        "options": [
          {
            "text": "I understand why it lands that way. I would not ask you to call the loss good. Christianity itself calls death an enemy. The philosophical answer only says the tragedy is not a formal contradiction in God. It does not make the grief small, and it does not tell me why this happened.",
            "next": "goodend",
            "grade": "strong",
            "note": "Good. You kept the intellectual claim modest and left room for lament rather than turning apologetics into emotional correction."
          },
          {
            "text": "At some point faith means trusting God even when we do not understand.",
            "next": "goodend",
            "grade": "mixed",
            "note": "That may belong inside Christian discipleship, but he is still asking whether Christianity is believable from outside."
          },
          {
            "text": "I am not saying it is good, just that God is allowed to have reasons.",
            "next": "goodend",
            "grade": "mixed",
            "note": "The content is closer, but the tone is still too courtroom-like for the actual conversation."
          }
        ]
      },
      "goodend": {
        "end": true,
        "summary": "A strong apologetic answer here has two jobs, intellectual honesty and human restraint. Do not invent God’s reason, do not deny the evidential force, and do not act as though solving the logical form removes the grief."
      }
    },
    "build": {
      "prompt": "A friend who has just been through a family tragedy says, “Do not tell me everything happens for a reason. I cannot see how a good God could allow this.” Write the first thing you would actually say to him.",
      "followUps": [
        "He tells you, “I am not only upset. I really think this makes God less likely to exist.”",
        "Then he says, “Saying God might have reasons we cannot see sounds like a way to protect your belief from any evidence.”"
      ],
      "models": [
        "I am sorry. I am not going to pretend I know why this happened or try to make it sound smaller than it is. If you want, we can talk about what suffering means for belief in God, but I also do not want to turn your grief into a debate if that is not what you need right now.",
        "I think suffering can count as evidence in the discussion. The question is what exactly it establishes and how strongly, especially when it is weighed with the rest of the evidence for and against God. I would not tell you the pain is irrelevant.",
        "That would be a bad answer if I used “unknown reasons” to make every possible amount of suffering count for nothing. The narrower point is that my not seeing a sufficient reason does not prove there cannot be one. The actual scale and character of suffering still have to be considered honestly."
      ],
      "studies": "Study 21, problem of evil, plus Study 23 on conversation",
      "studyId": 21
    }
  },
  {
    "id": "scripture",
    "level": "pressure",
    "title": "You are using the Bible to prove the Bible",
    "diagnose": "You keep quoting the New Testament to prove Jesus rose, then you use Jesus to prove the New Testament is God’s Word. That sounds circular.",
    "entryKey": "step2",
    "entry": "Step 2, historical method and the authority chain. Explain when the New Testament is being used as ordinary historical evidence and when the argument later reaches inspiration.",
    "diagnoseWhy": "The objection is not simply “the Bible is unreliable.” It is about the structure of the argument and whether inspiration is being smuggled into an earlier historical step.",
    "nodes": {
      "start": {
        "speaker": "Friend",
        "text": "You keep quoting the New Testament to prove Jesus rose, then you use Jesus to prove the New Testament is God’s Word. That sounds circular.",
        "options": [
          {
            "text": "It would be circular if I started by assuming the New Testament is inspired. The historical argument first treats its documents as ancient sources that can be examined like other sources, then asks what follows if the case for Jesus succeeds.",
            "next": "bias",
            "grade": "strong",
            "note": "Good. You distinguished historical use from theological conclusion."
          },
          {
            "text": "Using the Bible as evidence is not circular because every historical argument uses written sources.",
            "next": "bias",
            "grade": "mixed",
            "note": "Helpful, but you still need to explain that you are not assuming the source is inspired in the historical stage."
          },
          {
            "text": "The Bible has been shown to be reliable, so using it is fair.",
            "next": "bias",
            "grade": "mixed",
            "note": "Potentially relevant, but “reliable” is too global and can sound like the conclusion is already loaded in."
          }
        ]
      },
      "bias": {
        "speaker": "Friend",
        "text": "But these are Christian documents written by believers. Why trust interested witnesses?",
        "options": [
          {
            "text": "Being interested does not make a source useless. It means we examine what the source claims, when it was written, what earlier material it preserves, where it can be checked, and how it fits other evidence. Bias is a reason for scrutiny, not automatic dismissal.",
            "next": "canon",
            "grade": "strong",
            "note": "Good. You did not pretend the authors were neutral, and you did not treat commitment as disqualifying."
          },
          {
            "text": "Almost every ancient source has a point of view, so bias does not matter.",
            "next": "canon",
            "grade": "mixed",
            "note": "Bias does matter, it just does not automatically invalidate a source."
          },
          {
            "text": "They were willing to suffer for what they believed, which shows they were honest.",
            "next": "canon",
            "grade": "mixed",
            "note": "Sincerity can matter against deliberate fabrication, but it does not settle every historical claim or every author."
          }
        ]
      },
      "canon": {
        "speaker": "Friend",
        "text": "Suppose I grant some historical case for Jesus. How do you get from that to every New Testament book being God’s Word?",
        "options": [
          {
            "text": "Not in one jump. The argument moves through Jesus’ authority, his view of Israel’s Scriptures, his commissioning of the apostles, and then the historical recognition of apostolic writings. Each link needs its own case.",
            "next": "interp",
            "grade": "strong",
            "note": "Good. You refused to collapse the authority chain into a slogan."
          },
          {
            "text": "If Jesus rose, then Christianity is true, and the Christian Bible follows.",
            "next": "interp",
            "grade": "mixed",
            "note": "This compresses several important steps that the course intentionally separates."
          },
          {
            "text": "Jesus promised the Spirit would guide the apostles, so their writings are inspired.",
            "next": "interp",
            "grade": "mixed",
            "note": "That becomes relevant, but it still needs the prior historical case for Jesus’ authority and careful application to the canon."
          }
        ]
      },
      "interp": {
        "speaker": "Friend",
        "text": "And even if Scripture is true, Christians disagree about what it means. Does that not undercut the whole thing?",
        "options": [
          {
            "text": "It shows that an infallible text does not make every interpreter infallible. Disagreement can make interpretation harder, but it is a different question from whether God has spoken in Scripture.",
            "next": "goodend",
            "grade": "strong",
            "note": "Good. You distinguished authority from interpretation without pretending disagreement is trivial."
          },
          {
            "text": "Most important doctrines are clear enough that the disagreements do not matter much.",
            "next": "goodend",
            "grade": "mixed",
            "note": "There is a doctrine of clarity here, but this answer minimizes real interpretive disagreement instead of distinguishing the issues."
          },
          {
            "text": "The church helps us know the correct interpretation.",
            "next": "goodend",
            "grade": "mixed",
            "note": "True in an ordinary sense, but this opens a new ecclesiological question rather than directly answering the logic of the objection."
          }
        ]
      },
      "goodend": {
        "end": true,
        "summary": "The pressure point is structure. The learner should be able to use New Testament documents historically without assuming inspiration, then explain the later authority argument link by link instead of jumping from resurrection to “therefore the whole Bible.”"
      }
    },
    "build": {
      "prompt": "Someone says, “Your whole case is circular. You use the Bible to prove Jesus, then Jesus to prove the Bible.” Answer without pretending the objection is silly.",
      "followUps": [
        "He says, “But the New Testament authors were Christians. They were not neutral historians.”",
        "Then he asks, “Even if I grant Jesus rose, how does that prove every book in your New Testament is inspired?”"
      ],
      "models": [
        "It would be circular if I began by assuming the New Testament is inspired and then used that assumed inspiration to prove the resurrection. The historical step does not need that assumption. I can treat the documents as ancient sources, ask when they were written, what claims they preserve, and what evidence they give, then ask what follows if the historical case succeeds.",
        "They were not neutral, and I would not pretend they were. But interested testimony is not automatically worthless. Historians still ask what a source says, how early it is, what earlier material it contains, where it can be checked, and how it compares with other evidence.",