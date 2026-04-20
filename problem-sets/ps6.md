---
engines:
- path: /opt/quarto/share/extension-subtrees/julia-engine/\_extensions/julia-engine/julia-engine.js
execute:
  eval: false
resources:
- \*\*/\*Starter.pdf
- data/\*\*/\*.csv
- ../assets/
title: Problem Set 6
toc-title: Table of contents
---

1.  **Under pressure: Interference** (from G & G Ch. 8): In their study
    of spillover effects, Sinclair, McConnell, and Green[^1] sent
    mailings to randomly selected households in Chicago encouraging them
    to vote in an upcoming special election on April 7th 2009
    ([Figure 1](#fig-postcard){.quarto-xref}). The mailings used a form
    of social pressure, disclosing whether the targeted individual had
    voted in previous elections. Because this type of mail had proven to
    increase turnout by approximately 4-5 percentage points in previous
    experiments, the authors used it to study whether the treatment
    effects are transmitted across households.

    Employing a multilevel design, they randomly assigned all, half, or
    none of the members of each nine-digit zip code to receive mail. For
    purposes of this example, we focus only on households with one
    registered voter. The outcome variable is voter turnout as measured
    by the registrar of voters. The results are as follows. Among
    registered voters in untreated zip codes, 1,201 of 6,217 cast
    ballots. Among untreated voters in zip codes where half of the
    households received mail, 526 of 3,316 registered voters cast
    ballots. Among treated voters in zip codes where half of the
    households received mail, 620 of 2,949 voted. Finally, among treated
    voters in zip codes where every household received mail, turnout was
    1,316 of 6,377.

    a.  Identify the response variable, the units (measurement and
        experimental), and the experiental factor(s) and their levels.

    b.  Using potential outcomes, define the direct treatment effects
        (parameters) of receiving mail addressed to subject $i$.

    c.  Define the spillover treatment effects (also parameters) of
        being in a zip code where varying fractions of households are
        treated.

    d.  Propose an estimator for estimating the firsthand (direct) and
        secondhand (spillover) treatment effects. Show that the
        estimator is unbiased, explaining the assumptions required to
        reach this conclusion.

    e.  Based on these data, what are your estimates of the magnitude of
        the mailing's direct and spillover effects? What did we learn
        here scientifically?

    ![](../31-interference-1/images/postcard.png){width="300"}



More questions coming soon!

[^1]: Sinclair, McConnell, and Green (2012). *"Detecting Spillover
    Effects: Design and Analysis of Multilevel Experiments"* in
    *American Journal of Political Science*.
