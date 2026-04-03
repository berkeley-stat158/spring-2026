---
engines:
- path: /opt/quarto/share/extension-subtrees/julia-engine/\_extensions/julia-engine/julia-engine.js
execute:
  eval: false
resources:
- \*\*/\*Starter.pdf
- data/\*\*/\*.csv
- ../assets/
title: Problem Set 4
toc-title: Table of contents
---

1.  **Cancer and Group Therapy II**. Researchers randomly assigned
    metastatic breast cancer patients to either a control group or a
    group that received weekly 90-minute sessions of group therapy and
    self-hypnosis. The group therapy involved discussion and support for
    coping with the disease. The goal of the experiment was to see
    whether the latter treatment improved the patients' quality of life
    at the time, but a followup study on these patients collected data
    on the number of months of survival after the beginning of the
    study[^1].

    You can access the data from this study using the following code.

    ::: cell
    ``` {.r .cell-code}
    library(tidyverse)
    cancer <- read.csv("https://stat158.berkeley.edu/spring-2026/data/breast-cancer/breast-cancer.csv")
    ```
    :::

    `GROUP` is the original group assigned to the subject. `SURVIVAL` is
    the survival time in months from the beginning of the study. At the
    time the survival data was collected (10 years later), some subjects
    were still alive. They are flagged in the `CENSOR` column. Data (in
    this case survival time) that can only be known up to some bound is
    called *censored*.

    a.  The parameter of central interest to researchers is the $ATE$.
        What is the point estimate of this parameter using this data?
    b.  Form a 95% confidence interval associated the point estimate
        using the $t$ distribution. As before use the pooled estimate of
        the standard deviation[^2].
    c.  Form a 95% CI using RBI and the constant-effect assumption.
    d.  Methods b. and c. rely upon different assumptions. Describe what
        they are and which seem more realistic in this particular
        setting.

<!-- -->

2.  **Confident in your confidence intervals?** In lecture we formed a
    randomization-based confidence interval for the difference in mean
    response between the $X=11$ group and the $X=73$ group in the
    anchoring experiment. Your goal for this exercise is to use
    simulation to check the coverage of your interval and evaluate the
    consequences of using the constant effect assumption when it is
    violated.

    This simulation requires knowing the value of the true parameter,
    $ATE$, so you'll be playing this question as an all knowing god with
    all potential outcomes at your fingertips. You can find two full
    schedules of potential outcomes at the following links.

    ``` r
    godlikeA <- read.csv("https://stat158.berkeley.edu/spring-2026/data/anchoring/godlike_schedule_A.csv")
    godlikeB <- read.csv("https://stat158.berkeley.edu/spring-2026/data/anchoring/godlike_schedule_B.csv")
    ```

    Schedule A represents a world with constant effects: the individual
    treatment effect for each unit is the same. Schedule B represents a
    world with variable effects: each unit has a different individual
    treatment effect.

    a.  For each god-like schedule A and B, calculate the true $ATE$
        parameters.
    b.  For god-like schedule A, use simulation to create many original
        experiments and then for each construct a randomization-based CI
        with a constant effect assumption and evaluate whether it
        contains the true paramters. Select a $1-\alpha$ confidence
        level to use that is between 60% and 90%. For A and B
        separately, report the proportion of confidence intervals that
        contain the parameter.
    c.  Repeat b. but use god-like schedule B.
    d.  Did your randomization-based CIs with the constant effect
        assumption from the previous two questions succeed in capturing
        the parameter with probability $1-\alpha$? If not, provide some
        intuition for why not.

    This is a challenging simulation to set up correctly. If you get
    stuck please consult the hints[^3][^4][^5].



3.  **Growing Herbs II**: Botanists studying optimal greenhouse
    conditions for a fast-growing herb ran a fully-crossed three-way
    factorial experiment. They manipulated light intensity (low, medium,
    or high), watering frequency (low, medium, or high), and soil type
    (sandy or loam). Each of the $3 \times 3 \times 2 = 18$ treatment
    combinations was replicated twice, yielding $n = 36$ plants. The
    response is shoot dry weight (grams) measured after four weeks.

    Their results from running a full three-way ANOVA model are shown in
    the table below.

    :::: cell
    ::: {.cell-output .cell-output-stdout}
                         Df Sum Sq Mean Sq F value   Pr(>F)    
        light             2 190.54   95.27 135.084 1.45e-11 ***
        water             2 131.53   65.76  93.246 3.17e-10 ***
        soil              1  22.88   22.88  32.442 2.11e-05 ***
        light:water       4  33.41    8.35  11.842 6.85e-05 ***
        light:soil        2   4.98    2.49   3.533   0.0508 .  
        water:soil        2   1.10    0.55   0.781   0.4727    
        light:water:soil  4   6.34    1.59   2.248   0.1043    
        Residuals        18  12.70    0.71                     
        ---
        Signif. codes:  0 '***' 0.001 '**' 0.01 '*' 0.05 '.' 0.1 ' ' 1
    :::
    ::::

    a.  How many distinct null hypotheses are being tested in this ANOVA
        table?

    b.  Consider a decision rule that rejects an individual null
        hypothesis when the p-value is less than or equal to
        $\alpha = .05$. If we assume that the tests are independent,
        what is the probability of making at least one Type I error?

    c.  If you wanted to control the strong family-wise error rate at
        $\gamma = .05$ using a Bonferroni correction, what would be the
        new significance threshold for each individual test?

    d.  How many of the tests in the ANOVA table would be considered
        statistically significant at the $\alpha = .05$ level? How many
        would be considered statistically significant at the
        Bonferroni-corrected threshold you calculated in part c.?

    e.  Consider the proof we went through in class showing that a
        decision rule that uses the Bonferroni correction keeps the
        family-wise error rate less than or equal to $\gamma$. Under
        what scenario would this bound be tight? That is, when would the
        family-wise error rate actually equal $\gamma$ when using the
        Bonferroni correction? Does this seem like a realistic scenario
        in practice? What does that tell you about the actual
        family-wise error rate when using the Bonferroni correction in
        practice?



4.  **Babies Walking: Blocks**. Consider the Babies Walking study from
    lecture where babies were randomly assigned to one of four programs
    and the time it took for them to walk was recorded.

    a.  Why would it be difficult to use *parent ID* as a blocking
        factor in this study?

    b.  List two factors that *could* be used as blocking factors in
        this study. For each factor, why you would expect it to explain
        variation in walking time.

    c.  Imagine that one of your blocking factors has five levels,
        allowing for a complete block design. The data frame below
        provides the id of each baby in the original study along with
        their correponding block. Fill in the program column with a
        random assignment of the four programs to the babies within each
        block.

    :::: cell
    ::: cell-output-display
    <div id="pxmdefgrpq" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">
    <style>#pxmdefgrpq table {
      font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    #pxmdefgrpq thead, #pxmdefgrpq tbody, #pxmdefgrpq tfoot, #pxmdefgrpq tr, #pxmdefgrpq td, #pxmdefgrpq th {
      border-style: none;
    }

    #pxmdefgrpq p {
      margin: 0;
      padding: 0;
    }

    #pxmdefgrpq .gt_table {
      display: table;
      border-collapse: collapse;
      line-height: normal;
      margin-left: auto;
      margin-right: auto;
      color: #333333;
      font-size: 16px;
      font-weight: normal;
      font-style: normal;
      background-color: #FFFFFF;
      width: auto;
      border-top-style: solid;
      border-top-width: 2px;
      border-top-color: #A8A8A8;
      border-right-style: none;
      border-right-width: 2px;
      border-right-color: #D3D3D3;
      border-bottom-style: solid;
      border-bottom-width: 2px;
      border-bottom-color: #A8A8A8;
      border-left-style: none;
      border-left-width: 2px;
      border-left-color: #D3D3D3;
    }

    #pxmdefgrpq .gt_caption {
      padding-top: 4px;
      padding-bottom: 4px;
    }

    #pxmdefgrpq .gt_title {
      color: #333333;
      font-size: 125%;
      font-weight: initial;
      padding-top: 4px;
      padding-bottom: 4px;
      padding-left: 5px;
      padding-right: 5px;
      border-bottom-color: #FFFFFF;
      border-bottom-width: 0;
    }

    #pxmdefgrpq .gt_subtitle {
      color: #333333;
      font-size: 85%;
      font-weight: initial;
      padding-top: 3px;
      padding-bottom: 5px;
      padding-left: 5px;
      padding-right: 5px;
      border-top-color: #FFFFFF;
      border-top-width: 0;
    }

    #pxmdefgrpq .gt_heading {
      background-color: #FFFFFF;
      text-align: center;
      border-bottom-color: #FFFFFF;
      border-left-style: none;
      border-left-width: 1px;
      border-left-color: #D3D3D3;
      border-right-style: none;
      border-right-width: 1px;
      border-right-color: #D3D3D3;
    }

    #pxmdefgrpq .gt_bottom_border {
      border-bottom-style: solid;
      border-bottom-width: 2px;
      border-bottom-color: #D3D3D3;
    }

    #pxmdefgrpq .gt_col_headings {
      border-top-style: solid;
      border-top-width: 2px;
      border-top-color: #D3D3D3;
      border-bottom-style: solid;
      border-bottom-width: 2px;
      border-bottom-color: #D3D3D3;
      border-left-style: none;
      border-left-width: 1px;
      border-left-color: #D3D3D3;
      border-right-style: none;
      border-right-width: 1px;
      border-right-color: #D3D3D3;
    }

    #pxmdefgrpq .gt_col_heading {
      color: #333333;
      background-color: #FFFFFF;
      font-size: 100%;
      font-weight: normal;
      text-transform: inherit;
      border-left-style: none;
      border-left-width: 1px;
      border-left-color: #D3D3D3;
      border-right-style: none;
      border-right-width: 1px;
      border-right-color: #D3D3D3;
      vertical-align: bottom;
      padding-top: 5px;
      padding-bottom: 6px;
      padding-left: 5px;
      padding-right: 5px;
      overflow-x: hidden;
    }

    #pxmdefgrpq .gt_column_spanner_outer {
      color: #333333;
      background-color: #FFFFFF;
      font-size: 100%;
      font-weight: normal;
      text-transform: inherit;
      padding-top: 0;
      padding-bottom: 0;
      padding-left: 4px;
      padding-right: 4px;
    }

    #pxmdefgrpq .gt_column_spanner_outer:first-child {
      padding-left: 0;
    }

    #pxmdefgrpq .gt_column_spanner_outer:last-child {
      padding-right: 0;
    }

    #pxmdefgrpq .gt_column_spanner {
      border-bottom-style: solid;
      border-bottom-width: 2px;
      border-bottom-color: #D3D3D3;
      vertical-align: bottom;
      padding-top: 5px;
      padding-bottom: 5px;
      overflow-x: hidden;
      display: inline-block;
      width: 100%;
    }

    #pxmdefgrpq .gt_spanner_row {
      border-bottom-style: hidden;
    }

    #pxmdefgrpq .gt_group_heading {
      padding-top: 2px;
      padding-bottom: 2px;
      padding-left: 5px;
      padding-right: 5px;
      color: #333333;
      background-color: #FFFFFF;
      font-size: 100%;
      font-weight: initial;
      text-transform: inherit;
      border-top-style: solid;
      border-top-width: 2px;
      border-top-color: #D3D3D3;
      border-bottom-style: solid;
      border-bottom-width: 2px;
      border-bottom-color: #D3D3D3;
      border-left-style: none;
      border-left-width: 1px;
      border-left-color: #D3D3D3;
      border-right-style: none;
      border-right-width: 1px;
      border-right-color: #D3D3D3;
      vertical-align: middle;
      text-align: left;
    }

    #pxmdefgrpq .gt_empty_group_heading {
      padding: 0.5px;
      color: #333333;
      background-color: #FFFFFF;
      font-size: 100%;
      font-weight: initial;
      border-top-style: solid;
      border-top-width: 2px;
      border-top-color: #D3D3D3;
      border-bottom-style: solid;
      border-bottom-width: 2px;
      border-bottom-color: #D3D3D3;
      vertical-align: middle;
    }

    #pxmdefgrpq .gt_from_md > :first-child {
      margin-top: 0;
    }

    #pxmdefgrpq .gt_from_md > :last-child {
      margin-bottom: 0;
    }

    #pxmdefgrpq .gt_row {
      padding-top: 2px;
      padding-bottom: 2px;
      padding-left: 5px;
      padding-right: 5px;
      margin: 10px;
      border-top-style: solid;
      border-top-width: 1px;
      border-top-color: #D3D3D3;
      border-left-style: none;
      border-left-width: 1px;
      border-left-color: #D3D3D3;
      border-right-style: none;
      border-right-width: 1px;
      border-right-color: #D3D3D3;
      vertical-align: middle;
      overflow-x: hidden;
    }

    #pxmdefgrpq .gt_stub {
      color: #333333;
      background-color: #FFFFFF;
      font-size: 100%;
      font-weight: initial;
      text-transform: inherit;
      border-right-style: solid;
      border-right-width: 2px;
      border-right-color: #D3D3D3;
      padding-left: 5px;
      padding-right: 5px;
    }

    #pxmdefgrpq .gt_stub_row_group {
      color: #333333;
      background-color: #FFFFFF;
      font-size: 100%;
      font-weight: initial;
      text-transform: inherit;
      border-right-style: solid;
      border-right-width: 2px;
      border-right-color: #D3D3D3;
      padding-left: 5px;
      padding-right: 5px;
      vertical-align: top;
    }

    #pxmdefgrpq .gt_row_group_first td {
      border-top-width: 2px;
    }

    #pxmdefgrpq .gt_row_group_first th {
      border-top-width: 2px;
    }

    #pxmdefgrpq .gt_summary_row {
      color: #333333;
      background-color: #FFFFFF;
      text-transform: inherit;
      padding-top: 8px;
      padding-bottom: 8px;
      padding-left: 5px;
      padding-right: 5px;
    }

    #pxmdefgrpq .gt_first_summary_row {
      border-top-style: solid;
      border-top-color: #D3D3D3;
    }

    #pxmdefgrpq .gt_first_summary_row.thick {
      border-top-width: 2px;
    }

    #pxmdefgrpq .gt_last_summary_row {
      padding-top: 8px;
      padding-bottom: 8px;
      padding-left: 5px;
      padding-right: 5px;
      border-bottom-style: solid;
      border-bottom-width: 2px;
      border-bottom-color: #D3D3D3;
    }

    #pxmdefgrpq .gt_grand_summary_row {
      color: #333333;
      background-color: #FFFFFF;
      text-transform: inherit;
      padding-top: 8px;
      padding-bottom: 8px;
      padding-left: 5px;
      padding-right: 5px;
    }

    #pxmdefgrpq .gt_first_grand_summary_row {
      padding-top: 8px;
      padding-bottom: 8px;
      padding-left: 5px;
      padding-right: 5px;
      border-top-style: double;
      border-top-width: 6px;
      border-top-color: #D3D3D3;
    }

    #pxmdefgrpq .gt_last_grand_summary_row_top {
      padding-top: 8px;
      padding-bottom: 8px;
      padding-left: 5px;
      padding-right: 5px;
      border-bottom-style: double;
      border-bottom-width: 6px;
      border-bottom-color: #D3D3D3;
    }

    #pxmdefgrpq .gt_striped {
      background-color: rgba(128, 128, 128, 0.05);
    }

    #pxmdefgrpq .gt_table_body {
      border-top-style: solid;
      border-top-width: 2px;
      border-top-color: #D3D3D3;
      border-bottom-style: solid;
      border-bottom-width: 2px;
      border-bottom-color: #D3D3D3;
    }

    #pxmdefgrpq .gt_footnotes {
      color: #333333;
      background-color: #FFFFFF;
      border-bottom-style: none;
      border-bottom-width: 2px;
      border-bottom-color: #D3D3D3;
      border-left-style: none;
      border-left-width: 2px;
      border-left-color: #D3D3D3;
      border-right-style: none;
      border-right-width: 2px;
      border-right-color: #D3D3D3;
    }

    #pxmdefgrpq .gt_footnote {
      margin: 0px;
      font-size: 90%;
      padding-top: 4px;
      padding-bottom: 4px;
      padding-left: 5px;
      padding-right: 5px;
    }

    #pxmdefgrpq .gt_sourcenotes {
      color: #333333;
      background-color: #FFFFFF;
      border-bottom-style: none;
      border-bottom-width: 2px;
      border-bottom-color: #D3D3D3;
      border-left-style: none;
      border-left-width: 2px;
      border-left-color: #D3D3D3;
      border-right-style: none;
      border-right-width: 2px;
      border-right-color: #D3D3D3;
    }

    #pxmdefgrpq .gt_sourcenote {
      font-size: 90%;
      padding-top: 4px;
      padding-bottom: 4px;
      padding-left: 5px;
      padding-right: 5px;
    }

    #pxmdefgrpq .gt_left {
      text-align: left;
    }

    #pxmdefgrpq .gt_center {
      text-align: center;
    }

    #pxmdefgrpq .gt_right {
      text-align: right;
      font-variant-numeric: tabular-nums;
    }

    #pxmdefgrpq .gt_font_normal {
      font-weight: normal;
    }

    #pxmdefgrpq .gt_font_bold {
      font-weight: bold;
    }

    #pxmdefgrpq .gt_font_italic {
      font-style: italic;
    }

    #pxmdefgrpq .gt_super {
      font-size: 65%;
    }

    #pxmdefgrpq .gt_footnote_marks {
      font-size: 75%;
      vertical-align: 0.4em;
      position: initial;
    }

    #pxmdefgrpq .gt_asterisk {
      font-size: 100%;
      vertical-align: 0;
    }

    #pxmdefgrpq .gt_indent_1 {
      text-indent: 5px;
    }

    #pxmdefgrpq .gt_indent_2 {
      text-indent: 10px;
    }

    #pxmdefgrpq .gt_indent_3 {
      text-indent: 15px;
    }

    #pxmdefgrpq .gt_indent_4 {
      text-indent: 20px;
    }

    #pxmdefgrpq .gt_indent_5 {
      text-indent: 25px;
    }

    #pxmdefgrpq .katex-display {
      display: inline-flex !important;
      margin-bottom: 0.75em !important;
    }

    #pxmdefgrpq div.Reactable > div.rt-table > div.rt-thead > div.rt-tr.rt-tr-group-header > div.rt-th-group:after {
      height: 0px !important;
    }
    </style>

      id   block   program
      ---- ------- ---------
      1    A       NA
      2    A       NA
      3    A       NA
      4    A       NA
      5    B       NA
      6    B       NA
      7    B       NA
      8    B       NA
      9    C       NA
      10   C       NA
      11   C       NA
      12   C       NA
      13   D       NA
      14   D       NA
      15   D       NA
      16   D       NA
      17   E       NA
      18   E       NA
      19   E       NA
      20   E       NA

    </div>
    :::
    ::::



5.  **Blocking and Variance: Model-based**. In lecture we worked through
    the exact standard error of $\widehat{ATE}$ from the
    Randomization-Based framework. Consider an analogous parametric
    framing using the following model:

    $$Y_i \overset{\text{iid}}{\sim} N(\mu_{j(i)}, \sigma^2_{j(i)})$$

    where there are $J = 2$ groups of size $n_1$ and $n_2$, and $j(i)$
    is the treatment that unit $i$ belongs to.

    a.  What is the variance of $\widehat{ATE}$ under this model?

    b.  What guidance does this give us in making designs that maximize
        precision and power? Specifically comment on four quantities
        inspected in the lecture: the total number of units, the
        variances of the outcomes in each group, the balance of the
        design, and covariance between the outcomes in the two groups.
        Is there any difference in the guidance provided by this
        model-based framing compared to the randomization-based framing?

<!-- -->

6.  **Blocking and Variance: Unequal Treatment Allocation**. In the GCB
    design from lecture, each block assigned exactly half its units to
    treatment and half to control. Suppose instead that block $A$ (of
    size $n_A$) assigns $n_{A1}$ units to treatment and
    $n_{A0} = n_A - n_{A1}$ to control, and similarly block $B$ assigns
    $n_{B1}$ to treatment and $n_{B0} = n_B - n_{B1}$ to control, where
    $n_{A1}/n_A \neq n_{B1}/n_B$. For these calculations, use the
    (simpler) model-based framing from the previous question

    a.  Is the estimator
        $\widehat{ATE} = \frac{n_A}{n}\widehat{ATE}_A + \frac{n_B}{n}\widehat{ATE}_B$
        still unbiased for the overall ATE? Justify your answer.

    b.  Write out the full expression for $SE(\widehat{ATE})$,
        substituting in the CR\[1\] formula for each block-level SE
        (treating each block as its own completely randomized experiment
        with potentially unequal group sizes).

    c.  Suppose $\sigma_1^2 > \sigma_0^2$ within block $A$. Based on the
        CR\[1\] SE formula, what allocation ratio $n_{A1}/n_{A0}$
        minimizes $Var(\widehat{ATE}_A)$? What does this suggest about
        how you should design the experiment when you have prior
        knowledge about within-block variance?

[^1]: Data from Q 4.31 in *Statistical Sleuth*.

[^2]: In R, you can do this either "by hand" using the point estimate
    plus and minus a value of `qt()` times your estimate of the SE. You
    can also return to the last time you saw this dataset, in a testing
    framework. The object created by `t.test()` has bundled with it the
    associated confidence interval.

[^3]: The idea is to recreate the random process that leads to the
    create of the random confidence interval many times and check the
    proportion of those intervals that contain the parameter. In
    randomization-based inference, the only randomness comes from the
    assignments of units to treatment and control at the start of the
    original experiment, so that's were each one of your simulations
    begins.

[^4]: For each of settings A and B above, you will want to write a
    function. One approach is to write a function that:

    1.  Randomly assigns each unit to one of the two groups.
    2.  Sets the potential outcome that is *not* observed to be `NA`. At
        this stage, you have the analog of an original experimental data
        set.
    3.  Calculates $\widehat{ATE}$.
    4.  Uses $\widehat{ATE}$ to impute the missing potential outcomes.
    5.  Using this filled-in schedule, form a randomization-based
        confidence interval.
    6.  Check whether the interval contains the true parameter and
        return that logical value.

    Then you can replicate this function many times and count the
    proportion of `TRUE`s to estimate the coverage probability. See
    <https://andrewpbray.github.io/designrbi> for functions to
    facilitate steps 1-5.

[^5]: This code may take awhile to run - you're simulating many
    randomization-based CIs - so start with small numbers of replicates
    while you're still testing your code. You can also take advantage of
    your computers ability to run multiple R sessions at the same time
    using the `future_replicate()` function inside the `future.apply`
    package.
