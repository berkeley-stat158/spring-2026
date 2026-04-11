---
engines:
- path: /opt/quarto/share/extension-subtrees/julia-engine/\_extensions/julia-engine/julia-engine.js
execute:
  eval: false
resources:
- \*\*/\*Starter.pdf
- data/\*\*/\*.csv
- ../assets/
title: Problem Set 5
toc-title: Table of contents
---

1.  **Question Format and Score: Crossover Design**. Three weeks ago you
    took your midterm exam. Unbeknownst to you, the exam was also
    serving as a crossover experiment. There were four versions (A, B,
    C, D) where versions A/C shared one structure and versions B/D
    shared another. The treatment of interest was question *format*:
    whether a question was presented as a single compound sentence or as
    separate sentences/bullet points. Questions 21 and 23 each had a
    compound and a separated version; the two structures (A/C vs B/D)
    ensured that if Q21 was compound then Q23 was separated, and vice
    versa.

    Exam versions were randomly assigned to students in blocks by
    session (morning or afternoon).

    a.  What are the experimental units in this study? What are the
        measurement units?
    b.  What is the treatment? How many levels does it have?
    c.  Why is this a crossover design rather than a simple completely
        randomized design? What is the advantage of each student
        receiving both formats?
    d.  What is the blocking factor, and why was blocking used?

<!-- -->

2.  **Coffee and Reaction Time: Crossover Design**. A researcher wants
    to know whether drinking coffee before a cognitive test improves
    reaction time. She recruits 20 subjects and uses a crossover design:
    each subject takes the cognitive test twice, once after drinking
    coffee and once after drinking decaf (a placebo). The order
    (coffee-first vs decaf-first) is randomly assigned, with a one-week
    washout period between sessions.

    a.  What is the primary advantage of this crossover design compared
        to a completely randomized design that assigns 10 subjects to
        coffee and 10 to decaf?
    b.  The researcher is concerned about a *carryover effect*: caffeine
        from the first session might still affect performance in the
        second session even after a week. Explain why it is a threat to
        this crossover design.
    c.  If carryover effects are present and asymmetric (i.e., the
        carryover from coffee to decaf is different from the carryover
        from decaf to coffee), explain why the crossover estimator
        $\bar{Z}$ (the average of the observed differences) from the
        previous problem would be biased.
    d.  One way to test for carryover is to compare the *total* response
        (session 1 + session 2) between the two sequence groups. Explain
        the logic behind this test: under no carryover, why should the
        sequence groups have the same expected total?

<!-- -->

3.  **Coffee and Reaction Time: Analysis**. The researcher from the
    previous problem ran her crossover experiment and collected data.
    You can generate a synthetic version of her dataset with the
    following code.

    ::: cell
    ``` {.r .cell-code}
    library(tidyverse)
    set.seed(40)
    n <- 20
    coffee <- tibble(
        subject  = 1:n,
        sequence = rep(c("coffee_first", "decaf_first"), each = n / 2),
        subject_ability = rnorm(n, mean = 250, sd = 30)
    ) |>
        mutate(
            period1 = case_when(
                sequence == "coffee_first" ~ subject_ability - 8 + rnorm(n, 0, 10),
                sequence == "decaf_first"  ~ subject_ability + rnorm(n, 0, 10)
            ),
            period2 = case_when(
                sequence == "coffee_first" ~ subject_ability + 5 + rnorm(n, 0, 10),
                sequence == "decaf_first"  ~ subject_ability - 8 + 5 + rnorm(n, 0, 10)
            )
        ) |>
        select(subject, sequence, period1, period2)
    ```
    :::

    Here, `period1` and `period2` are reaction times (in milliseconds)
    on the cognitive test in session 1 and session 2 respectively. We'll
    denote these $Y_{i1}$ and $Y_{i2}$ for subject $i$. Lower is better.
    The data-generating process includes a true treatment effect of
    coffee (coffee lowers reaction time by 8 ms) and a period effect
    (reaction time increases by 5 ms in period 2, perhaps due to fatigue
    or reduced novelty). There is no carryover effect.

    a.  For each subject, compute $Z_i$, the within-subject difference
        in reaction time (decaf $-$ coffee). Be careful: which period
        corresponds to the coffee score depends on the subject's
        sequence. Add this column to the data frame and compute
        $\bar{Z}$.

    b.  Conduct a randomization test of the sharp null hypothesis that
        coffee has no effect on any subject's reaction time.

        i.  State the null hypothesis in terms of potential outcomes.
        ii. Simulate 1,000 test statistics under the null by
            re-randomizing the sequence assignment (a complete
            randomization of 10 to each sequence).
        iii. Plot the null distribution with the observed statistic and
             report the two-sided p-value.

    c.  Reshape the data into long format (one row per subject per
        period) and fit a linear model with fixed effects for subject:

        $$Y_{ij} = \beta_0 + \beta_1 \text{treatment}_{ij} + \beta_2 \text{period}_{ij} + \alpha_i + \varepsilon_{ij}$$

        where $\alpha_i$ is a fixed effect for subject $i$. Report and
        interpret $\hat{\beta}_1$. Compare this with the result from the
        randomization test.

    d.  Now fit a simpler model that omits the period effect:
        $Y_{ij} = \beta_0 + \beta_1 \text{treatment}_{ij} + \alpha_i + \varepsilon_{ij}$.
        How does the estimate of the treatment effect change? Explain
        why the crossover design protects the treatment effect estimate
        from period effects even when period is not included in the
        model.

<!-- 
@. **Why Cross Over?**. Consider an experiment with $N = 2n$ subjects and two treatments. Compare two designs:

    - **Design CRD**: A completely randomized design where $n$ subjects are assigned to treatment $A$ and $n$ to treatment $B$.
    - **Design CO**: A crossover design where each of the $2n$ subjects receives both treatments (in random order).

    Suppose the outcome for subject $i$ under treatment $t$ can be written as $Y_i(t) = \mu_t + s_i + \varepsilon_{it}$, where $s_i \sim N(0, \sigma_s^2)$ is a subject effect and $\varepsilon_{it} \sim N(0, \sigma_\varepsilon^2)$ is random error, with all terms independent.

    a. Under Design CRD, show that $\text{Var}(\hat{\tau}_{CRD}) = \frac{2(\sigma_s^2 + \sigma_\varepsilon^2)}{n}$.
    b. Under Design CO, each subject provides $Y_i(A) - Y_i(B) = \tau + (\varepsilon_{iA} - \varepsilon_{iB})$. Show that $\text{Var}(\hat{\tau}_{CO}) = \frac{2\sigma_\varepsilon^2}{2n} = \frac{\sigma_\varepsilon^2}{n}$.
    c. Compute the ratio $\text{Var}(\hat{\tau}_{CRD}) / \text{Var}(\hat{\tau}_{CO})$. Under what conditions on $\sigma_s^2$ and $\sigma_\varepsilon^2$ is the crossover design most advantageous? Give a real-world example where you'd expect this condition to hold strongly.

:::{.content-hidden unless-meta="solutions"}

#### Part a.

Under CRD, $\hat{\tau}_{CRD} = \bar{Y}_A - \bar{Y}_B$ where $\bar{Y}_A = \frac{1}{n}\sum_{i \in A} Y_i(A)$ and $\bar{Y}_B = \frac{1}{n}\sum_{i \in B} Y_i(B)$.

Since subjects in group $A$ are different from subjects in group $B$ (between-subjects comparison), the two group means are independent. Each individual observation has variance $\sigma_s^2 + \sigma_\varepsilon^2$, so:

$$
\text{Var}(\bar{Y}_A) = \frac{\sigma_s^2 + \sigma_\varepsilon^2}{n}, \quad \text{Var}(\bar{Y}_B) = \frac{\sigma_s^2 + \sigma_\varepsilon^2}{n}
$$

$$
\text{Var}(\hat{\tau}_{CRD}) = \text{Var}(\bar{Y}_A) + \text{Var}(\bar{Y}_B) = \frac{2(\sigma_s^2 + \sigma_\varepsilon^2)}{n}
$$

#### Part b.

Under CO, define $W_i = Y_i(A) - Y_i(B) = \tau + \varepsilon_{iA} - \varepsilon_{iB}$ for each subject. The subject effect $s_i$ cancels out. The estimator is $\hat{\tau}_{CO} = \bar{W} = \frac{1}{2n}\sum_{i=1}^{2n} W_i$.

Each $W_i$ has variance $\text{Var}(\varepsilon_{iA} - \varepsilon_{iB}) = 2\sigma_\varepsilon^2$ (since $\varepsilon_{iA}$ and $\varepsilon_{iB}$ are independent). Therefore:

$$
\text{Var}(\hat{\tau}_{CO}) = \frac{2\sigma_\varepsilon^2}{2n} = \frac{\sigma_\varepsilon^2}{n}
$$

#### Part c.

$$
\frac{\text{Var}(\hat{\tau}_{CRD})}{\text{Var}(\hat{\tau}_{CO})} = \frac{2(\sigma_s^2 + \sigma_\varepsilon^2)/n}{\sigma_\varepsilon^2/n} = \frac{2(\sigma_s^2 + \sigma_\varepsilon^2)}{\sigma_\varepsilon^2} = 2\left(1 + \frac{\sigma_s^2}{\sigma_\varepsilon^2}\right)
$$

The crossover design is most advantageous when $\sigma_s^2 / \sigma_\varepsilon^2$ is large — that is, when between-subject variability dominates within-subject variability. This is common in biomedical studies: for instance, when measuring blood pressure response to a drug, baseline blood pressure varies enormously between people but the same person's response to a drug across two occasions (the within-subject error) is relatively stable. In such settings, the crossover can be dramatically more efficient than a CRD.

::: -->



4.  **Sequential Probability Ratio Test: Tinkering with Parameters**.
    The SPRT is a powerful tool, but its performance depends on the
    choice of parameters. In this exercise, we will explore how changing
    the parameters $p_0$, $p_1$, $\alpha$, and $\beta$ affects the
    behavior of the test that was shown in class[^1].

    a.  Using the same simulation of a single run that was shown in
        class, lower both the error rates ($\alpha$ and $\beta$) to
        represent a more stringent test. Plot the same simulated run
        with the new thresholds. How does the decision process change
        with the new thresholds? Does it take more or fewer samples to
        reach a decision?

    b.  Choose a fixed value for $p_0$ (e.g., 0.5) and vary $p_1$ (e.g.,
        0.6, 0.7, 0.8). For each value of $p_1$, use a full simulation
        to calculate the expected number of samples needed to reach a
        decision under both hypotheses.

    c.  Now, fix $p_1$ (e.g., 0.7) and vary $p_0$ (e.g., 0.5, 0.4, 0.3).
        Again, calculate the expected number of samples needed for each
        scenario.

    d.  Summarize your findings. How do the choices of $p_0$ and $p_1$
        affect the efficiency of the SPRT? What trade-offs do you
        observe when adjusting the error rates $\alpha$ and $\beta$?



Check back later for more questions.

[^1]: See the slides for Sequential Analysis I for code to simulate the
    performance of the SPRT.
