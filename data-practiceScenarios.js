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
            "text": "God is eternal, so the rule does not apply to him. The universe had a beginning, but God never did.",
            "next": "special",
            "grade": "mixed",
            "note": "True as far as it goes, but it lets the bad premise stand. The first job is to correct what the argument actually says."
          },
          {
            "text": "The argument needs to be stated more carefully. Kalam says things that begin need a cause; contingency asks why dependent things exist.",
            "next": "special",
            "grade": "strong",
            "note": "Good. You corrected the premise before defending the conclusion."
          },
          {
            "text": "The universe began, while God is outside time and never began. That is why I would put God in a different category from the universe.",
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
            "text": "A necessary reality is not an exception to the rule. It is what the argument says is needed to explain things that depend on something else.",
            "next": "universe",
            "grade": "strong",
            "note": "Good. You explained why necessity is part of the conclusion rather than a convenient exemption."
          },
          {
            "text": "Every explanation has to stop somewhere eventually, and stopping with God makes more sense than saying the universe explains itself without any deeper reason.",
            "next": "universe",
            "grade": "mixed",
            "note": "There is something right here, but “we have to stop somewhere” does not yet show why the stopping point should be necessary rather than arbitrary."
          },
          {
            "text": "God is the Creator rather than part of creation, so it makes sense that the same rules that apply to created things would not apply to him.",
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
            "text": "That is the real question. I would ask whether the changing, dependent universe we observe has the kind of existence a necessary stopping point would need.",
            "next": "goodend",
            "grade": "strong",
            "note": "Good. You did not merely repeat “God is necessary.” You turned to the explanatory comparison the argument actually requires."
          },
          {
            "text": "The Big Bang gives us evidence that the universe had a beginning, so I do not think the universe can be the necessary reality we need.",
            "next": "goodend",
            "grade": "mixed",
            "note": "A beginning matters for Kalam, but this question is about necessity. Do not switch arguments unless you mean to."
          },
          {
            "text": "Nothing physical can be necessary because matter changes and is made of parts, so the necessary foundation has to be outside the physical universe.",
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
        "That is a fair question. Then we have to compare the universe we actually have with what a necessary ultimate reality would have to be like, rather than simply calling the universe necessary because we want the chain of explanations to stop."
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
            "text": "I agree that atheists can be kind and morally serious. The argument is about what makes moral duties really true, not who behaves better.",
            "next": "basic",
            "grade": "strong",
            "note": "Good. You conceded what should be conceded and kept the argument on grounding."
          },
          {
            "text": "Christians can fail morally too, sometimes badly. But hypocrisy would show that Christians fail their own standard, not that objective morality has no foundation.",
            "next": "basic",
            "grade": "mixed",
            "note": "True, but it answers hypocrisy more than the grounding claim."
          },
          {
            "text": "Many atheists live as though some things are truly right or wrong, which suggests people can recognize moral truth even without believing in God.",
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
            "text": "That is a serious option. I would ask whether brute moral facts can explain obligation, human worth, and why those facts have authority over us.",
            "next": "euth",
            "grade": "strong",
            "note": "Good. You treated the alternative as an actual position rather than pretending atheism has no answer."
          },
          {
            "text": "Facts can describe what is true, but that does not automatically explain why a person is obligated to obey a moral fact rather than ignore it.",
            "next": "euth",
            "grade": "mixed",
            "note": "There is a real is/ought issue here, but this is too compressed. Moral realism has more sophisticated versions than this answer allows."
          },
          {
            "text": "If morality is just built into reality with no personal source, I worry that it becomes a set of facts without any real reason we must follow them.",
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
            "text": "I would ground goodness in God's character, not in random commands. His commands express who he is rather than creating goodness by sheer choice.",
            "next": "goodend",
            "grade": "strong",
            "note": "Good. You avoided both horns of the simplistic dilemma and stated the Christian position clearly."
          },
          {
            "text": "God made us and has authority over us, so I think his right to give moral commands is part of why those commands really bind us.",
            "next": "goodend",
            "grade": "mixed",
            "note": "Creator authority matters, but by itself this can sound like sheer power makes right."
          },
          {
            "text": "Whatever God commands is good because he is the highest authority, so there is no standard above him that could judge his commands.",
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
        "The Christian claim is not that God invents goodness by arbitrary commands. God’s commands express his good character, so goodness is not outside God and is not whatever a powerful being happens to prefer."
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
            "text": "Normally, dead people stay dead. I would ask whether you mean resurrection is naturally impossible, or impossible even if God exists.",
            "next": "supernatural",
            "grade": "strong",
            "note": "Good. You kept the ordinary biological fact while exposing the deeper assumption."
          },
          {
            "text": "That is exactly why Christians call the resurrection a miracle. It would not be something the ordinary course of nature could produce on its own.",
            "next": "supernatural",
            "grade": "mixed",
            "note": "True, but it does not yet tell you whether the person has ruled miracles out in principle."
          },
          {
            "text": "The disciples believed they saw Jesus alive afterward, so even if resurrection is unusual, we still need some explanation for what they experienced.",
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
            "text": "I would not use God to explain anything strange. First ask whether God exists; then a particular miracle claim still has to be supported by evidence.",
            "next": "gaps",
            "grade": "strong",
            "note": "Good. This keeps miracles tied to evidence rather than turning them into a gap filler."
          },
          {
            "text": "Science studies the natural world, so it cannot simply declare that God never acts. That leaves room for miracles even if science cannot test God directly.",
            "next": "gaps",
            "grade": "mixed",
            "note": "Useful but incomplete. The stronger move is to connect miracle possibility to the prior case for God and then return to historical evidence."
          },
          {
            "text": "If God exists, miracles are possible, and that means we should not reject a miracle claim before we have even looked at the historical evidence.",
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
            "text": "No. Saying God could act only keeps the door open. It does not show that he did. The historical evidence still has to carry that claim.",
            "next": "goodend",
            "grade": "strong",
            "note": "Good. You clearly separated possibility from proof."
          },
          {
            "text": "I would only consider a miracle when an event has a clear religious setting and a natural explanation does not seem to fit the evidence very well.",
            "next": "goodend",
            "grade": "mixed",
            "note": "Religious context matters, but significance alone is not enough. Evidence still has to do real work."
          },
          {
            "text": "If an event really cannot be explained naturally, then a supernatural explanation becomes more reasonable because the natural options have already failed.",
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
    "entry": "Ask first. This could be a claim about what counts as knowledge, a claim that nature is all there is, or a “God of the gaps” concern. Do not pick an argument until you know which one he means.",
    "diagnoseWhy": "The sentence can point in more than one direction. The right first move is clarification, not guessing.",
    "nodes": {
      "start": {
        "speaker": "Friend",
        "text": "I am not saying science has disproved God. I just notice that the more science explains, the less work there seems to be for God to do.",
        "options": [
          {
            "text": "When you say science leaves less room for God, do you mean natural explanations replace God, or that Christians only appeal to God when science gets stuck?",
            "next": "natural",
            "grade": "strong",
            "note": "Good. You separated two different objections before answering either one."
          },
          {
            "text": "Science explains processes inside nature, while God answers the deeper question of why there is a universe at all. I do not think those explanations compete.",
            "next": "natural",
            "grade": "mixed",
            "note": "A useful distinction, but you answered before confirming what he meant."
          },
          {
            "text": "A scientific explanation and a divine explanation can both be true, because one can describe the mechanism while the other explains why the system exists.",
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
            "text": "Explaining a process inside the universe is different from explaining why the whole system exists, has these powers, and can be understood at all.",
            "next": "brute",
            "grade": "strong",
            "note": "Good. You did not attack science, you distinguished levels of explanation."
          },
          {
            "text": "God can still be the cause behind every natural cause, so discovering more natural causes does not push him out of the picture or make him unnecessary.",
            "next": "brute",
            "grade": "mixed",
            "note": "This may be true, but it sounds like an added assertion unless you give a reason for it."
          },
          {
            "text": "Science is very good at describing natural processes, but questions about why anything exists or why nature has laws are outside what science can answer.",
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
            "text": "You can stop with a brute universe, but that is a stopping point rather than an explanation. Then we can compare which stopping point explains more.",
            "next": "gap",
            "grade": "strong",
            "note": "Good. You treated brute fact as a real option and moved to explanatory comparison."
          },
          {
            "text": "I do not think the universe can be a brute fact because everything that exists needs some reason explaining why it exists instead of nothing.",
            "next": "gap",
            "grade": "mixed",
            "note": "This needs careful defense. Do not smuggle in a premise stronger than the course has established."
          },
          {
            "text": "The order and regularity of the universe make a purely brute physical reality hard to accept, because those features look more like design than accident.",
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
            "text": "I agree. I am not arguing, 'science does not know, therefore God.' Even a known mechanism can leave a deeper question about why that whole reality exists.",
            "next": "goodend",
            "grade": "strong",
            "note": "Good. You accepted the legitimate concern and showed why the argument is not a gap argument."
          },
          {
            "text": "Science will probably always leave some questions unanswered, so I do not think it is unreasonable to see God as the best explanation for what remains.",
            "next": "goodend",
            "grade": "mixed",
            "note": "Probably, but that would leave you leaning on gaps again, which is exactly the concern he raised."
          },
          {
            "text": "Scientists also begin with assumptions they cannot prove scientifically, so Christians should be allowed to bring their own worldview assumptions into the discussion.",
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
            "text": "Even if reality had no first moment, I would still ask whether it exists necessarily or whether it could remain dependent and in need of an explanation.",
            "next": "always",
            "grade": "strong",
            "note": "Good. You did not make the whole case depend on one cosmological model."
          },
          {
            "text": "Most cosmologists still think the universe had some kind of beginning, so I would want stronger evidence before treating an eternal cosmos as the better option.",
            "next": "always",
            "grade": "mixed",
            "note": "Scientific evidence matters, but this lets the argument stand or fall with a debated model."
          },
          {
            "text": "An actually infinite past creates serious philosophical problems, so I do not think a beginningless universe is a live option once those problems are understood.",
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
            "text": "Existing forever answers how long something lasts, not whether it depends on anything. Duration and dependence are two different questions.",
            "next": "godeternal",
            "grade": "strong",
            "note": "Good. You isolated the conceptual distinction the objection misses."
          },
          {
            "text": "Even eternal matter would still need something to explain why it exists, because existing forever does not mean that it created or explains itself.",
            "next": "godeternal",
            "grade": "mixed",
            "note": "Self-creation is not really the issue if the proposal is that it never began."
          },
          {
            "text": "Only God can truly be eternal, because physical things change and depend on other things while God exists in himself and depends on nothing.",
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
            "text": "Eternity alone would not be enough for God either. The claim is that the ultimate explanation is necessary, not merely very old or beginningless.",
            "next": "goodend",
            "grade": "strong",
            "note": "Good. You applied the same standard to God rather than changing the rules."
          },
          {
            "text": "God is different because he is immaterial and outside the physical universe, so his being eternal does not create the same problem as eternal matter.",
            "next": "goodend",
            "grade": "mixed",
            "note": "Immateriality may matter later, but it does not by itself answer the charge about eternity."
          },
          {
            "text": "God is eternal by definition, while the universe is not. Once those terms are clear, I do not think there is really a double standard.",
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
        "I would not make everything depend on proving a first moment. Even if physical reality had always existed, we can still ask whether it exists necessarily or is still dependent, and why that kind of reality exists at all.",
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
    "diagnoseWhy": "The surface claim is religious diversity. The real objection could be about what we can know, whether all religions can be true, about history, or something more personal. Clarify before launching into Christianity.",
    "nodes": {
      "start": {
        "speaker": "Friend",
        "text": "Christians say Christianity is true. Muslims say Islam is true. Other religions say the same thing. From the outside it just looks like everybody is certain about their own tradition.",
        "options": [
          {
            "text": "What do you think the disagreement shows: that none can be known, or that we need a fair way to compare the different claims?",
            "next": "proof",
            "grade": "strong",
            "note": "Good. You did not assume what conclusion he was drawing from religious diversity."
          },
          {
            "text": "They cannot all be true in the same way because they contradict each other about God and salvation, so disagreement does not mean there is no truth.",
            "next": "proof",
            "grade": "mixed",
            "note": "Important, but this only shows they are not all true in the same sense. It does not yet answer whether one can be known."
          },
          {
            "text": "Christianity is different because it makes historical claims that can be checked about Jesus that can be investigated rather than asking us to accept a private spiritual experience.",
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
            "text": "We do not have to compare every religion at once. Start with shared questions about God, then test Christianity where it makes historical claims about Jesus.",
            "next": "birth",
            "grade": "strong",
            "note": "Good. You gave a manageable method instead of pretending the diversity itself is simple."
          },
          {
            "text": "Christianity has stronger historical evidence than the other major religions, especially around Jesus and the resurrection, so that gives us a reasonable place to begin.",
            "next": "birth",
            "grade": "mixed",
            "note": "Maybe, but this is a conclusion. The learner should show how the comparison can be made."
          },
          {
            "text": "You would have to examine each religion as objectively as you can, compare its evidence, and then choose the one that best fits the facts.",
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
            "text": "Upbringing clearly influences belief. But explaining how you came to believe something is different from showing whether it is true. We still test the claim.",
            "next": "goodend",
            "grade": "strong",
            "note": "Good. You conceded the sociology without confusing origin of belief with truth of belief."
          },
          {
            "text": "People convert to Christianity from very different cultures and religions, so geography cannot be the whole explanation for why someone ends up believing Christianity.",
            "next": "goodend",
            "grade": "mixed",
            "note": "True, but conversion examples do not by themselves answer the general point about cultural influence."
          },
          {
            "text": "Everyone has biases from family and culture, so pointing out that Christians have them does not tell us whether Christianity itself is actually true or false.",
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
        "I would not try to compare every detail of every religion at once. Start with larger questions such as whether God exists and what follows from that, then test Christianity at its historical claims that can be checked about Jesus and the resurrection.",
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
            "text": "That is possible in principle. I would start by asking how early the resurrection claim appears instead of assuming either that legends did or did not develop.",
            "next": "paul",
            "grade": "strong",
            "note": "Good. You met the historical hypothesis directly and avoided an absolute claim about legends."
          },
          {
            "text": "The Gospels are early enough that eyewitnesses could still challenge the story, which makes a slow legendary growth of the resurrection much less likely.",
            "next": "paul",
            "grade": "mixed",
            "note": "The basic instinct is relevant, but “too early” is stronger than the evidence warrants by itself."
          },
          {
            "text": "The disciples were willing to suffer for the resurrection claim, and people generally do not accept that kind of cost for something they know they invented.",
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
            "text": "Paul does not settle everything. His letters matter because they show resurrection belief was already central very early and preserve traditions he says he received.",
            "next": "creed",
            "grade": "strong",
            "note": "Good. You stated what Paul can establish without making him do more than he can."
          },
          {
            "text": "Paul personally met Peter and James, so he had direct access to people who knew Jesus and could check whether the resurrection story was true.",
            "next": "creed",
            "grade": "mixed",
            "note": "His contacts matter, but “settles it” overclaims what those meetings alone prove."
          },
          {
            "text": "Paul was recognized as an apostle, so his testimony carries special authority and gives us good reason to trust what he says about the resurrection.",
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
            "text": "I would not claim an exact date. The case rests on Paul's language of receiving tradition, his timeline, and his contact with earlier leaders.",
            "next": "gospels",
            "grade": "strong",
            "note": "Good. You used the evidence while admitting the limit."
          },
          {
            "text": "Most scholars date the tradition within a few years of the resurrection, so I think we can be confident it was already fixed very early.",
            "next": "gospels",
            "grade": "mixed",
            "note": "Consensus language can be useful, but this is too sweeping and substitutes a slogan for the reasons."
          },
          {
            "text": "Paul had no reason to lie about receiving the tradition, especially when people who knew the earlier leaders could have challenged him if he made it up.",
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
            "text": "I agree. Early belief can still be false. Earliness answers the legend theory; then we still ask what best explains the resurrection evidence.",
            "next": "goodend",
            "grade": "strong",
            "note": "Good. You conceded the exact limit of the argument and moved to the cumulative case."
          },
          {
            "text": "An early belief is much more likely to preserve what really happened because there was less time for the story to change before people repeated it.",
            "next": "goodend",
            "grade": "mixed",
            "note": "Sometimes, but earliness alone does not give you that much. Keep the inference narrow."
          },
          {
            "text": "The apostles were present from the beginning, so a false resurrection belief would have been corrected before it could spread through the early church.",
            "next": "goodend",
            "grade": "mixed",
            "note": "Too confident. Early communities can hold false beliefs. The case needs evidence, not just proximity."
          }
        ]
      },
      "goodend": {
        "end": true,
        "summary": "The pressure here is to avoid turning one useful fact into the whole resurrection case. Early proclamation answers a late-legend theory, but the resurrection conclusion comes from the evidence taken together."
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
      "studyId": 14
    }
  },
  {
    "id": "evil",
    "level": "pressure",
    "title": "Why would God let this happen?",
    "diagnose": "My sister lost a baby. I do not want a lecture about free will. I cannot see how a loving God can watch something like that happen.",
    "entryKey": "clarify",
    "entry": "Ask first, and be human. This may be an objection from the amount of suffering, a logical claim, grief that does not need an argument yet, or some combination of them.",
    "diagnoseWhy": "A philosophical answer can be correct and still be the wrong first response. Find out what kind of conversation this is before turning pain into a logic exercise.",
    "nodes": {
      "start": {
        "speaker": "Friend",
        "text": "My sister lost a baby. I do not want a lecture about free will. I cannot see how a loving God can watch something like that happen.",
        "options": [
          {
            "text": "I am really sorry. I would not pretend I know why that happened. Do you want to talk about the argument, or mostly about what your family is carrying?",
            "next": "evidence",
            "grade": "strong",
            "note": "Good. You acknowledged the person and clarified whether an argument is even appropriate."
          },
          {
            "text": "I do not know why God allowed it, and I would not tell you the loss was good. Christianity gives hope in suffering, but that does not erase it.",
            "next": "evidence",
            "grade": "mixed",
            "note": "Compassionate and true, though it still does not ask what he needs from the conversation."
          },
          {
            "text": "Christians can say God may have good reasons we cannot see, even when a particular loss feels completely senseless from where we stand.",
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
            "text": "I would take that seriously as evidence. The question is what conclusion suffering supports, how strongly, and how it weighs against the rest of the case.",
            "next": "hidden",
            "grade": "strong",
            "note": "Good. You did not dismiss the evidence or pretend one observation settles the whole worldview."
          },
          {
            "text": "Evil may actually point toward God because calling something objectively evil assumes a real moral standard that goes beyond personal preference or social agreement.",
            "next": "hidden",
            "grade": "mixed",
            "note": "The moral argument can be relevant, but using it here as a quick reversal misses the weight as evidence of the objection."
          },
          {
            "text": "God can bring good from suffering, so I do not think suffering should count strongly against him even when we cannot see the good yet.",
            "next": "hidden",
            "grade": "mixed",
            "note": "Possible redemption does not erase the question of how much suffering counts as evidence, and you do not know God’s particular reason here."
          }
        ]
      },
      "hidden": {
        "speaker": "Friend",
        "text": "Isn’t “God has reasons we cannot see” just an escape hatch? You could say that no matter how much suffering there was.",
        "options": [
          {
            "text": "It would be an escape hatch if I used it to dismiss every amount of suffering. I only mean that not seeing a reason does not prove there is none.",
            "next": "pastoral",
            "grade": "strong",
            "note": "Good. You preserved the logical point without making the worldview unfalsifiable by definition."
          },
          {
            "text": "We are finite and God would know far more than we do, so it should not surprise us if some of his reasons are beyond our understanding.",
            "next": "pastoral",
            "grade": "mixed",
            "note": "There is a theological truth here, but it can be used too broadly and make the evidential objection disappear just by saying so."
          },
          {
            "text": "Every worldview leaves some hard questions unanswered, so Christianity should not be rejected simply because it cannot explain every case of suffering.",
            "next": "pastoral",
            "grade": "mixed",
            "note": "True in a general sense, but it does not yet answer how much weight as evidence suffering should carry."
          }
        ]
      },
      "pastoral": {
        "speaker": "Friend",
        "text": "I still hate that answer. It sounds like I am being told to accept something horrible because God must know better.",
        "options": [
          {
            "text": "I would not ask you to call the loss good. The philosophical answer only says suffering is not a contradiction in God; it does not explain this loss.",
            "next": "goodend",
            "grade": "strong",
            "note": "Good. You kept the intellectual claim modest and left room for lament rather than turning apologetics into emotional correction."
          },
          {
            "text": "At some point Christian faith does involve trusting God when we do not understand what he is doing, even when that trust is painful and difficult.",
            "next": "goodend",
            "grade": "mixed",
            "note": "That may belong inside Christian discipleship, but he is still asking whether Christianity is believable from outside."
          },
          {
            "text": "I am not saying the loss itself is good. I am saying a good God could still have reasons for allowing something we would never choose.",
            "next": "goodend",
            "grade": "mixed",
            "note": "The content is closer, but the tone is still too courtroom-like for the actual conversation."
          }
        ]
      },
      "goodend": {
        "end": true,
        "summary": "A strong apologetic answer here has two jobs, intellectual honesty and human restraint. Do not invent God’s reason, do not deny the weight as evidence, and do not act as though solving the logical form removes the grief."
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
      "studies": "Study 22, problem of evil, plus Study 21 on conversation",
      "studyId": 22
    }
  },
  {
    "id": "scripture",
    "level": "pressure",
    "title": "You are using the Bible to prove the Bible",
    "diagnose": "You keep quoting the New Testament to prove Jesus rose, then you use Jesus to prove the New Testament is God’s Word. That sounds circular.",
    "entryKey": "step2",
    "entry": "Step 2. First explain how the New Testament can be used as historical evidence without assuming inspiration. Then keep the later case for Scripture separate.",
    "diagnoseWhy": "The objection is not simply “the Bible is unreliable.” It is about the structure of the argument and whether inspiration is being assumed before it has been argued for.",
    "nodes": {
      "start": {
        "speaker": "Friend",
        "text": "You keep quoting the New Testament to prove Jesus rose, then you use Jesus to prove the New Testament is God’s Word. That sounds circular.",
        "options": [
          {
            "text": "It would be circular if I assumed inspiration first. The historical case starts by treating New Testament writings as ancient sources and asking what they support.",
            "next": "bias",
            "grade": "strong",
            "note": "Good. You distinguished historical use from the later theological conclusion."
          },
          {
            "text": "Using the Bible as evidence is not automatically circular because historians use written sources all the time, including sources written by people who believed what they described.",
            "next": "bias",
            "grade": "mixed",
            "note": "Helpful, but you still need to explain that you are not assuming inspiration at the historical stage."
          },
          {
            "text": "The Bible has already shown itself historically reliable in many places, so I think it is fair to use what it says about Jesus as evidence.",
            "next": "bias",
            "grade": "mixed",
            "note": "Potentially relevant, but “reliable” is too broad here and can make it sound like the conclusion was assumed at the start."
          }
        ]
      },
      "bias": {
        "speaker": "Friend",
        "text": "But these are Christian documents written by believers. Why trust interested witnesses?",
        "options": [
          {
            "text": "Interested witnesses are not useless witnesses. Their claims still have to be tested by date, sources, checkable details, and how they fit the other evidence.",
            "next": "canon",
            "grade": "strong",
            "note": "Good. You did not pretend the writers were neutral, and you did not treat commitment as disqualifying."
          },
          {
            "text": "Almost every ancient source has a point of view, so I do not think the writers' Christian beliefs should count much against their testimony.",
            "next": "canon",
            "grade": "mixed",
            "note": "Bias does matter. The point is that it does not automatically make a source worthless."
          },
          {
            "text": "The early Christians were willing to suffer for what they believed, which gives us a strong reason to think the writers were honest about Jesus.",
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
            "text": "I would not make that jump. The case moves through Jesus' authority, his view of Scripture, the apostles, and then writings tied to apostolic authority.",
            "next": "interp",
            "grade": "strong",
            "note": "Good. You kept the authority chain intact instead of jumping from resurrection straight to the whole Bible."
          },
          {
            "text": "If Jesus rose from the dead, Christianity is true, and once Christianity is true the New Testament naturally comes with the religion Jesus founded.",
            "next": "interp",
            "grade": "mixed",
            "note": "This compresses several steps that the course intentionally separates."
          },
          {
            "text": "Jesus promised the Spirit would guide his apostles, so once we trust Jesus we have good reason to treat what the apostles wrote as inspired.",
            "next": "interp",
            "grade": "mixed",
            "note": "That becomes relevant, but only after the case for Jesus’ authority, and it still has to be connected carefully to the New Testament writings."
          }
        ]
      },
      "interp": {
        "speaker": "Friend",
        "text": "And even if Scripture is true, Christians disagree about what it means. Does that not undercut the whole thing?",
        "options": [
          {
            "text": "It shows that readers can be wrong. Disagreement can make interpretation harder, but that is different from asking whether God has spoken in Scripture.",
            "next": "goodend",
            "grade": "strong",
            "note": "Good. You distinguished the authority of Scripture from the fallibility of its interpreters."
          },
          {
            "text": "Most central Christian teachings are clear enough that disagreements over smaller issues do not seriously weaken the claim that Scripture communicates truth.",
            "next": "goodend",
            "grade": "mixed",
            "note": "There is a real doctrine of clarity, but this answer minimizes genuine disagreement instead of distinguishing the two questions."
          },
          {
            "text": "The church gives us a community and tradition for reading Scripture, so individual disagreement does not leave us without any way to know the right interpretation.",
            "next": "goodend",
            "grade": "mixed",
            "note": "The church matters, but this opens another question instead of answering whether disagreement cancels the authority of the text."
          }
        ]
      },
      "goodend": {
        "end": true,
        "summary": "Keep the order of the argument straight. The New Testament can first be used as historical evidence without assuming inspiration. If the case for Jesus succeeds, his authority then becomes part of the later case for Scripture."
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
        "It does not prove the whole New Testament in one jump. The course moves from Jesus’ authority to his view of Scripture and his commissioning of the apostles, then asks how writings carrying that apostolic authority were recognized. Each step has to be argued rather than assumed."
      ],
      "studies": "Studies 11 and 17–20, especially historical evidence and the later case for Scripture",
      "studyId": 20
    }
  },
  {
    "id": "naturalismbundle",
    "level": "mixed",
    "title": "Science explains more, so where is God left?",
    "diagnose": "Suppose I grant that God is possible. Why bring him in when physics explains the universe and evolution explains life? It feels like religion just moves to whatever science has not reached yet.",
    "entryKey": "clarify",
    "entry": "Ask first. Several claims are bundled together, so find out whether the real issue is a God-of-the-gaps argument, biological design, or whether natural explanations make God unnecessary.",
    "diagnoseWhy": "There are at least three different arguments here. Answering all of them at once would make the conversation less clear.",
    "nodes": {
      "start": {
        "speaker": "Friend",
        "text": "Suppose I grant that God is possible. Why bring him in when physics explains the universe and evolution explains life? It feels like religion just moves to whatever science has not reached yet.",
        "options": [
          {
            "text": "Before I answer, do you mean natural mechanisms make God unnecessary, or that Christian arguments only appeal to God where science has not finished explaining things?",
            "next": "mechanism",
            "grade": "strong",
            "note": "Good. You separated two different objections before choosing an argument."
          },
          {
            "text": "Fine-tuning still gives us evidence for God because physics has not explained why the constants and laws fall into a life-permitting range in the first place.",
            "next": "mechanism",
            "grade": "mixed",
            "note": "Fine-tuning may become relevant, but you answered a specific argument before finding out what he meant."
          },
          {
            "text": "Science cannot explain God because God is outside the natural world, so scientific progress does not really have anything to say about whether he exists.",
            "next": "mechanism",
            "grade": "mixed",
            "note": "That may be true about scientific method, but it does not yet answer the claim that natural explanations make God unnecessary."
          }
        ]
      },
      "mechanism": {
        "speaker": "Friend",
        "text": "Mostly the first one. If evolution can explain biological complexity naturally, why bring design into it?",
        "options": [
          {
            "text": "A natural mechanism and a design question are not always rivals. We can ask what mutation and selection explain, then ask what explains the larger system.",
            "next": "dna",
            "grade": "strong",
            "note": "Good. You did not deny observed biological change, and you kept the larger design question open."
          },
          {
            "text": "Evolution can explain small changes within living things, but it has not shown how genuinely new biological information or complex machinery can arise naturally.",
            "next": "dna",
            "grade": "mixed",
            "note": "That is too compressed and can overstate what has been shown. The stronger move is to separate observed change from the larger explanatory claims."
          },
          {
            "text": "Cells look designed because their parts work together toward functions, and things with that kind of coordinated purpose are best explained by intelligence.",
            "next": "dna",
            "grade": "mixed",
            "note": "That is too quick. The lesson argues from specific features and explanatory comparison, not appearance alone."
          }
        ]
      },
      "dna": {
        "speaker": "Friend",
        "text": "But shared DNA is exactly what common ancestry predicts. Why treat common design as anything more than an escape hatch?",
        "options": [
          {
            "text": "Shared DNA is real evidence. Common ancestry interprets it one way; common design can expect reused structures too. The larger explanations still have to be compared.",
            "next": "gaps",
            "grade": "strong",
            "note": "Good. You acknowledged the evidence instead of pretending genetic similarity is irrelevant."
          },
          {
            "text": "Shared DNA actually fits common design very well because intelligent designers often reuse successful patterns, especially when they are building related systems.",
            "next": "gaps",
            "grade": "mixed",
            "note": "Common design can make sense of reuse, but saying the same evidence proves your view is too strong without a fuller comparison."
          },
          {
            "text": "DNA similarity is not very useful for ancestry because similarity can come from either common ancestry or common design, so it does not favor either view.",
            "next": "gaps",
            "grade": "weak",
            "note": "That dismisses evidence the course itself says has to be interpreted rather than ignored."
          }
        ]
      },
      "gaps": {
        "speaker": "Friend",
        "text": "I still worry this is just God of the gaps with more sophisticated language.",
        "options": [
          {
            "text": "That would be a problem if the case were 'we do not know, therefore God.' I am asking what known features of reality are best explained by.",
            "next": "goodend",
            "grade": "strong",
            "note": "Good. You answered the actual concern and connected it to the broader course rather than hiding God in an unknown mechanism."
          },
          {
            "text": "Every worldview has things it cannot explain, so I do not think naturalists can criticize Christians for having gaps unless they can remove all of their own.",
            "next": "goodend",
            "grade": "mixed",
            "note": "That can be worth discussing later, but it does not show that your own argument is not a gap argument."
          },
          {
            "text": "Scientists also accept assumptions they cannot prove, so calling a design argument a gap argument can become unfair if naturalism gets a free pass.",
            "next": "goodend",
            "grade": "mixed",
            "note": "That shifts attention to scientists instead of explaining the structure of your argument."
          }
        ]
      },
      "goodend": {
        "end": true,
        "summary": "The hard part is keeping several questions separate. Natural mechanisms can be real without settling every question about God, design, or the ultimate explanation of the system itself."
      }
    },
    "build": {
      "prompt": "A coworker says, “Physics explains the universe and evolution explains life. It feels like God only gets whatever science has not reached yet.” What would you ask before deciding how to answer?",
      "followUps": [
        "He clarifies, “Evolution is the clearest example. Natural selection gives us a natural explanation for apparent design.”",
        "Then he says, “And genetic similarities fit common ancestry. Why is common design not just something creationists say to protect their view?”"
      ],
      "models": [
        "I would first ask what he thinks a scientific explanation replaces. Does he mean that once we know a natural mechanism, God is no longer needed as an explanation at any level, or is he objecting specifically to design arguments that rely on missing mechanisms? Those are different claims.",
        "I would agree that mutation and natural selection explain real biological change. The next question is what they are being asked to explain. The course separates observed change from larger claims about universal common ancestry, biological information, coordinated molecular machinery, and the origin of life.",
        "The similarities are real and should not be waved away. Common ancestry interprets them one way, while common design can also predict reused structures. Then the discussion has to move beyond one similarity and compare how the larger explanations fit the whole body of evidence."
      ],
      "studies": "Studies 3, 5–7, and 23",
      "studyId": 23
    }
  },
  {
    "id": "hurtandhistory",
    "level": "mixed",
    "title": "Pain, church failure, and whether Christianity is true",
    "diagnose": "After my family lost a child, some church leaders gave us canned answers and acted like questions showed weak faith. Since then I have had a hard time trusting either the church or the idea of a loving God.",
    "entryKey": "clarify",
    "entry": "Ask first. There is grief, a problem-of-evil argument, and distrust created by Christians’ actions. Do not flatten those into one debate question.",
    "diagnoseWhy": "A technically correct argument can still answer the wrong thing if you do not find out which part the person wants to talk about first.",
    "nodes": {
      "start": {
        "speaker": "Friend",
        "text": "After my family lost a child, some church leaders gave us canned answers and acted like questions showed weak faith. Since then I have had a hard time trusting either the church or the idea of a loving God.",
        "options": [
          {
            "text": "There are several things tangled together there. What happened with the church, and which part is making Christianity hardest for you to trust right now?",
            "next": "leaders",
            "grade": "strong",
            "note": "Good. You did not turn grief into a philosophy exercise, and you gave him room to identify the real issue."
          },
          {
            "text": "The free-will defense is not the only Christian answer to suffering, so I would not assume your loss leaves Christianity without any serious response.",
            "next": "leaders",
            "grade": "mixed",
            "note": "True, but he explicitly told you he does not want that kind of lecture right now."
          },
          {
            "text": "Bad church leaders can do real damage, but their failure does not by itself tell us whether the central claims about Jesus are historically true.",
            "next": "leaders",
            "grade": "mixed",
            "note": "Logically true, but it is too early and risks treating the personal betrayal as irrelevant."
          }
        ]
      },
      "leaders": {
        "speaker": "Friend",
        "text": "The leaders covered up something serious and then acted like questioning them meant questioning God. It made the whole thing feel manipulative.",
        "options": [
          {
            "text": "That was wrong. Using God's authority to protect leaders from accountability is not something I would defend. Their failure matters, even if truth is a separate question.",
            "next": "truth",
            "grade": "strong",
            "note": "Good. You conceded the moral failure without letting it automatically decide the historical question."
          },
          {
            "text": "People can abuse good institutions, including churches. That does not make the beliefs of the institution false, even when the abuse is serious and damaging.",
            "next": "truth",
            "grade": "mixed",
            "note": "The logical distinction is there, but it minimizes why the experience affected his trust."
          },
          {
            "text": "Jesus warned that false teachers would come, so the existence of abusive leaders actually fits what Christianity already told us to expect.",
            "next": "truth",
            "grade": "weak",
            "note": "That turns a painful experience into a debating point and overstates what the warning would establish."
          }
        ]
      },
      "truth": {
        "speaker": "Friend",
        "text": "Maybe. But if Christians can be that wrong, why trust Christian documents about Jesus either?",
        "options": [
          {
            "text": "I would not trust a source just because it is Christian. I would ask when it was written, what it claims, and how it fits other evidence.",
            "next": "evil",
            "grade": "strong",
            "note": "Good. You moved from institutional trust to historical method without pretending bias disappears."
          },
          {
            "text": "The apostles were different from later church leaders because they personally knew Jesus, so their testimony deserves more trust than the leaders who hurt your family.",
            "next": "evil",
            "grade": "mixed",
            "note": "That may become part of the evidence, but it is better to explain how historical sources are actually evaluated."
          },
          {
            "text": "Christianity has survived corrupt leaders for centuries, which suggests its historical foundation is stronger than the failures of the people representing it.",
            "next": "evil",
            "grade": "weak",
            "note": "Institutional survival does not establish the reliability of a particular historical claim."
          }
        ]
      },
      "evil": {
        "speaker": "Friend",
        "text": "I still come back to the baby. Even if I granted some history about Jesus, I do not understand why a good God would allow that.",
        "options": [
          {
            "text": "I do not know why that happened. Christianity does not ask you to call the loss good. We can discuss the argument without pretending to explain your tragedy.",
            "next": "goodend",
            "grade": "strong",
            "note": "Good. You stayed truthful about the argument and modest about what you do not know."
          },
          {
            "text": "God can bring good out of suffering even when we cannot see it, so the fact that this loss feels pointless does not mean it really was pointless.",
            "next": "goodend",
            "grade": "mixed",
            "note": "That can be a Christian hope, but here it risks sounding like you are supplying a reason for this particular tragedy that you do not know."
          },
          {
            "text": "If the historical case for Jesus and the resurrection is strong, then that evidence should outweigh the problem of suffering even when suffering is personally devastating.",
            "next": "goodend",
            "grade": "weak",
            "note": "The resurrection can matter to the larger Christian answer, but this dismisses the evidential and personal force of the objection."
          }
        ]
      },
      "goodend": {
        "end": true,
        "summary": "Some conversations mix evidence, grief, and distrust. Listen long enough to separate them. You can admit Christian wrongdoing, make a historical case, and discuss evil without pretending one short answer settles all three."
      }
    },
    "build": {
      "prompt": "A friend says, “After my family went through a terrible loss, church leaders handled it badly and shut down our questions. Now I have a hard time trusting either them or the idea of a loving God.” What would you say first?",
      "followUps": [
        "He says, “Even if the leaders were wrong, why should I trust Christian sources about Jesus when Christians can be so biased?”",
        "Then he says, “And I still cannot see how a loving God lets a baby die.”"
      ],
      "models": [
        "I would not start by defending the church or giving you a theory of suffering. What happened with the leaders matters, and the loss matters. If you are willing, I would first want to know which part you want to talk about, because those are connected for you but they are not exactly the same question.",
        "I would not ask you to trust a source just because it is Christian. We can examine the New Testament documents as historical sources before deciding they are inspired, looking at their date, claims, earlier traditions, connections to witnesses, and how they fit the rest of the evidence.",
        "I do not know why God allowed that particular loss, and I would not tell you I do. The problem of evil can be discussed philosophically, but a philosophical answer is not the same thing as explaining why this happened to your family. Christianity gives reasons to think suffering is not meaningless, but it does not require us to call death good."
      ],
      "studies": "Studies 11, 21, and 22",
      "studyId": 22
    }
  },
  {
    "id": "rapidfire",
    "level": "mixed",
    "title": "Four objections at once",
    "diagnose": "Okay, then answer this: who created God, why does evolution look true, why should I trust a Bible that has been copied for centuries, and why would a good God allow children to suffer?",
    "entryKey": "clarify",
    "entry": "Ask first. Do not try to answer four separate objections in one speech. Pick one issue together and finish that conversation before moving to the next.",
    "diagnoseWhy": "The challenge is not lack of material. It is keeping the conversation from becoming a pile of half-answers.",
    "nodes": {
      "start": {
        "speaker": "Friend",
        "text": "Okay, then answer this: who created God, why does evolution look true, why should I trust a Bible that has been copied for centuries, and why would a good God allow children to suffer?",
        "options": [
          {
            "text": "I would not answer all four at once. They are different questions. Which one matters most to you, so we can actually finish one conversation?",
            "next": "pick",
            "grade": "strong",
            "note": "Good. You controlled the scope without dodging the questions."
          },
          {
            "text": "Those questions all have answers. I would start with the cosmological argument, then move through evolution, the Bible, and suffering in a logical order.",
            "next": "pick",
            "grade": "mixed",
            "note": "You are willing to answer, but you are about to turn the conversation into a lecture."
          },
          {
            "text": "Most of those objections depend on misunderstandings, so the best approach is probably to clear them up one by one before getting into the positive case.",
            "next": "pick",
            "grade": "mixed",
            "note": "One by one is right, but calling them misunderstandings before answering can sound dismissive."
          }
        ]
      },
      "pick": {
        "speaker": "Friend",
        "text": "Fine. Who created God?",
        "options": [
          {
            "text": "First correct the premise. Kalam concerns things that begin; contingency concerns things that depend. God is argued for as necessary, not added as an exception.",
            "next": "switch",
            "grade": "strong",
            "note": "Good. You answered the chosen question without dragging the other three back in."
          },
          {
            "text": "Nobody created God because God is eternal and never began to exist, while the universe did begin and therefore needs something outside itself.",
            "next": "switch",
            "grade": "mixed",
            "note": "That is part of the answer, but it leaves the bad premise mostly untouched."
          },
          {
            "text": "The universe had a beginning, and evolution cannot explain that beginning, so we still need a Creator even if biological evolution were completely true.",
            "next": "switch",
            "grade": "weak",
            "note": "You switched to a different issue instead of answering the question he chose."
          }
        ]
      },
      "switch": {
        "speaker": "Friend",
        "text": "All right, but the Bible has been copied and translated so many times. How could we know what it originally said?",
        "options": [
          {
            "text": "That is a new question, but we can take it next. We compare manuscripts to recover the text, then separately ask whether its claims are true.",
            "next": "evil",
            "grade": "strong",
            "note": "Good. You changed topics only because he chose to, and you separated text recovery from historical truth."
          },
          {
            "text": "We have far more New Testament manuscripts than we have for other ancient books, so that gives us strong confidence that the Bible is historically true.",
            "next": "evil",
            "grade": "mixed",
            "note": "Manuscript evidence can help recover the text, but manuscript quantity does not prove the events described actually happened."
          },
          {
            "text": "Modern Bible translations are based on very early manuscripts and careful scholarship, so the old claim that the text was copied beyond recognition is not a serious problem.",
            "next": "evil",
            "grade": "mixed",
            "note": "That is too broad. Textual variants are real, even if they do not mean the text is hopelessly lost."
          }
        ]
      },
      "evil": {
        "speaker": "Friend",
        "text": "Then what about children suffering? That one matters more to me than the manuscript question.",
        "options": [
          {
            "text": "Then I would stay there. Are you asking whether suffering makes God impossible, makes him less likely, or connects to something personal? Those need different answers.",
            "next": "goodend",
            "grade": "strong",
            "note": "Good. You recognized that this objection needs diagnosis before argument."
          },
          {
            "text": "The logical problem of evil has already been answered if God could have good reasons for allowing suffering, so I would start with that distinction.",
            "next": "goodend",
            "grade": "mixed",
            "note": "That may address one form of the argument, but you do not yet know which form he is raising."
          },
          {
            "text": "God can use suffering for good, so suffering does not disprove him even when we cannot identify the good that may come from a particular tragedy.",
            "next": "goodend",
            "grade": "mixed",
            "note": "That is too fast and may supply a reason for particular suffering that you do not know."
          }
        ]
      },
      "goodend": {
        "end": true,
        "summary": "Mixed conversations are often a test of restraint. Answer the question in front of you, notice when the topic changes, and do not confuse having four answers with giving one good answer."
      }
    },
    "build": {
      "prompt": "Someone gives you four objections in one breath: “Who created God? Evolution explains design. The Bible has been copied too many times. And a good God would not allow suffering.” What do you say first?",
      "followUps": [
        "He chooses, “Who created God?” Answer that one without drifting into the other three.",
        "After your answer he says, “Fine, but now tell me why the Bible should be trusted after centuries of copying.”"
      ],
      "models": [
        "I would not try to answer all four at once. They are different questions, and if I give you a speech covering all of them we probably will not know where we actually disagree. Pick the one you care about most and let me try to answer that one first.",
        "The argument is not that everything needs a cause. Kalam says what begins to exist needs a cause, while the contingency argument asks why dependent reality exists at all. So God is not being made an exception to the rule. The claim is that the explanation eventually has to terminate in something necessary rather than another dependent thing.",
        "First I would separate two questions. Comparing the manuscripts asks whether we can recover what the documents originally said, and the manuscript evidence gives us a way to compare copies rather than trusting a chain of translations. After that comes the historical question of whether the recovered claims are true."
      ],
      "studies": "Studies 3–4, 11, 21–23",
      "studyId": 21
    }
  }
]);

const practiceDiagnosisItems = [
  {
    "id": "d-clarify-science",
    "entryKey": "clarify",
    "q": "Science keeps explaining more and more. I just do not see where God fits anymore.",
    "entry": "Ask first. Find out whether the person means natural explanations replace God, or whether they are worried about a God-of-the-gaps argument.",
    "why": "Those are different objections. If you guess which one they mean, you may give a good answer to the wrong question."
  },
  {
    "id": "d-clarify-contradictions",
    "entryKey": "clarify",
    "q": "The Bible has contradictions, so I do not see why anyone treats it as reliable.",
    "entry": "Ask first. Find out which supposed contradiction they have in mind before defending the Bible in general.",
    "why": "A specific textual or historical problem needs a specific answer. A broad speech about reliability may never touch the concern."
  },
  {
    "id": "d-clarify-suffering",
    "entryKey": "clarify",
    "q": "If God is good, why is there so much suffering?",
    "entry": "Ask first. Find out whether this is a logical objection, an evidence question, or something connected to personal suffering.",
    "why": "Those questions overlap, but they do not call for the same first response."
  },
  {
    "id": "d-clarify-hypocrisy",
    "entryKey": "clarify",
    "q": "I have seen too many hypocritical Christians to take Christianity seriously.",
    "entry": "Ask first. Find out whether the person is raising a truth objection, a trust problem, or describing something that happened to them.",
    "why": "Christian hypocrisy matters, but you should not assume you know what conclusion the person is drawing from it."
  },
  {
    "id": "d-clarify-evolution",
    "entryKey": "clarify",
    "q": "Evolution pretty much settles the creation question for me.",
    "entry": "Ask first. Find out what they mean by evolution and what conclusion they think follows from it.",
    "why": "Observed change, common ancestry, the origin of life, and the claim that nature is all there is are not the same claim."
  },
  {
    "id": "d-foundation-relative",
    "entryKey": "foundation",
    "q": "That may be true for you, but truth is different for different people.",
    "entry": "Start with reasoning and truth. The first issue is whether contradictory claims can both describe reality.",
    "why": "Before arguing for Christianity, clear up what the person means by truth."
  },
  {
    "id": "d-foundation-there",
    "entryKey": "foundation",
    "q": "You were not there when Jesus lived, so you cannot really know what happened.",
    "entry": "Start with reasoning and evidence. The issue is whether historical knowledge requires direct observation.",
    "why": "We know many past events through testimony, documents, and inference rather than seeing them ourselves."
  },
  {
    "id": "d-foundation-disagreement",
    "entryKey": "foundation",
    "q": "Smart people disagree about religion, so I do not think anyone can really know.",
    "entry": "Start with reasoning and truth. Disagreement does not by itself show that there is no true answer.",
    "why": "The first question is what disagreement proves, not yet which religious claim is correct."
  },
  {
    "id": "d-foundation-possible",
    "entryKey": "foundation",
    "q": "Maybe there is some other explanation. If another explanation is possible, your argument is not proven.",
    "entry": "Start with reasoning. A possible alternative still has to explain the evidence well enough to compete.",
    "why": "This is about how explanations are compared, not yet about a particular argument for God or Christianity."
  },
  {
    "id": "d-foundation-arguments",
    "entryKey": "foundation",
    "q": "People can make an argument sound convincing for almost anything, so arguments do not prove much.",
    "entry": "Start with reasoning. Separate whether an argument sounds persuasive from whether its conclusion follows and its premises are true.",
    "why": "The person is questioning how arguments work, so that foundation comes before any apologetic argument."
  },
  {
    "id": "d-step1-brute",
    "entryKey": "step1",
    "q": "Maybe the universe just exists. Why does it need any explanation beyond itself?",
    "entry": "Start with the case for God. This is a contingency question about whether dependent reality needs an ultimate explanation.",
    "why": "The disagreement is already about what could explain the universe, so you do not need to jump ahead to Jesus or Scripture."
  },
  {
    "id": "d-step1-finetune",
    "entryKey": "step1",
    "q": "Maybe the fine-tuning is just luck, or there are enough universes that one had to work.",
    "entry": "Start with the case for God. Compare chance, multiverse proposals, necessity, and design as explanations of fine-tuning.",
    "why": "This belongs in natural theology: what best explains a feature of the universe we observe?"
  },
  {
    "id": "d-step1-morality",
    "entryKey": "step1",
    "q": "My atheist neighbor is a better person than plenty of Christians. Why would morality need God?",
    "entry": "Start with the case for God, but separate moral behavior from what grounds objective moral duties and value.",
    "why": "The moral argument is not that atheists cannot behave well. It asks what makes moral truths objectively binding."
  },
  {
    "id": "d-step1-eternal",
    "entryKey": "step1",
    "q": "Maybe the universe, a multiverse, or some deeper physical reality has simply always existed.",
    "entry": "Start with the case for God. Ask whether existing forever would make that reality necessary or merely beginningless.",
    "why": "Duration and dependence are different questions. This is still about the ultimate explanation of reality."
  },
  {
    "id": "d-step1-design",
    "entryKey": "step1",
    "q": "Natural selection can produce things that look designed. Why bring a Designer into biology?",
    "entry": "Start with the case for God. Ask what the proposed mechanism explains and whether design is being inferred from positive features rather than a gap.",
    "why": "The issue is whether unguided causes or intelligence better explain the feature being discussed."
  },
  {
    "id": "d-bridge-dead",
    "entryKey": "bridge",
    "q": "Dead people do not come back. That is enough for me to rule out the resurrection.",
    "entry": "Start with miracles. Ask whether resurrection is being called naturally impossible or impossible even if God exists.",
    "why": "The person is excluding a miraculous explanation before the historical evidence is considered."
  },
  {
    "id": "d-bridge-science",
    "entryKey": "bridge",
    "q": "Science works because it looks for natural causes. Miracles do not belong in a serious explanation.",
    "entry": "Start with miracles. Ask whether the way science normally looks for natural causes is being turned into the larger claim that supernatural action can never occur.",
    "why": "The key issue is whether divine action is ruled out in principle."
  },
  {
    "id": "d-bridge-anything",
    "entryKey": "bridge",
    "q": "Once you allow miracles, you can explain anything by saying God did it.",
    "entry": "Start with miracles. Separate saying a miracle is possible from claiming that a particular miracle actually happened.",
    "why": "Making divine action possible does not remove the need for evidence."
  },
  {
    "id": "d-bridge-probability",
    "entryKey": "bridge",
    "q": "A miracle is always less likely than some natural explanation, no matter how strange the natural explanation is.",
    "entry": "Start with miracles. Ask what prior assumptions are being used to assign the miracle such a low probability.",
    "why": "The prior case for God changes whether divine action can be dismissed before the evidence is weighed."
  },
  {
    "id": "d-bridge-repeatable",
    "entryKey": "bridge",
    "q": "If an event cannot be repeated in a lab, I do not see how anyone could reasonably believe it was a miracle.",
    "entry": "Start with miracles, while also using the course's foundation on historical evidence.",
    "why": "Past events are normally investigated through historical evidence, even when the event itself cannot be repeated."
  },
  {
    "id": "d-step2-legend",
    "entryKey": "step2",
    "q": "Jesus probably existed, but the resurrection sounds like a legend that grew after he died.",
    "entry": "Start with Jesus and Christianity. Look at how early the resurrection claim appears and what evidence needs explaining.",
    "why": "The person is granting enough background to move directly into the historical case."
  },
  {
    "id": "d-step2-bias",
    "entryKey": "step2",
    "q": "The New Testament was written by Christians, so of course it says Jesus rose.",
    "entry": "Start with Jesus and Christianity. Treat the writings as historical sources and ask how interested testimony should actually be evaluated.",
    "why": "Bias calls for scrutiny, not automatic acceptance or automatic dismissal."
  },
  {
    "id": "d-step2-copying",
    "entryKey": "step2",
    "q": "The Bible was copied for centuries. How could we know what the original writers actually said?",
    "entry": "Start with Jesus and Christianity. First separate recovering the text from deciding whether the recovered claims are true.",
    "why": "This is a manuscript question about recovering the text before it becomes a broader inspiration question."
  },
  {
    "id": "d-step2-claims",
    "entryKey": "step2",
    "q": "I do not think Jesus ever claimed anything close to being God. Christians added that later.",
    "entry": "Start with Jesus and Christianity. Examine the earliest sources and the kinds of claims and authority attributed to Jesus.",
    "why": "This is directly about Jesus' identity and the historical sources."
  },
  {
    "id": "d-step2-resurrection",
    "entryKey": "step2",
    "q": "Even if the disciples believed Jesus was alive, people can be sincerely wrong. Why call it a resurrection?",
    "entry": "Start with Jesus and Christianity. Compare the resurrection claim with alternative explanations of the evidence.",
    "why": "The person is not ruling miracles out in principle; they are asking which historical explanation fits best."
  }
];