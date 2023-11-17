let form = document.getElementById("my_form");
let table = document.getElementById("my_table");
form.addEventListener(
    "submit", function (e) {
        e.preventDefault()

        let basic_salary = Number(document.getElementById("basic_salary").value);
        let benefits = Number(document.getElementById("benefits").value);
        if (basic_salary && benefits) {
            let gross_salary = calc_gross_salary(basic_salary, benefits)
            document.getElementById("gross").innerText = gross_salary.toFixed(2)
            let nssf= calc_NSSF(gross_salary)
            document.getElementById("NSSF").innerText=nssf
            let nhdf=calc_NHDF(gross_salary)
            document.getElementById("NHDF").innerText=nhdf.toFixed(2)
            let taxable_income=calc_taxable_income(gross_salary,nssf,nhdf)
            document.getElementById("Taxable_income").innerText=taxable_income
            let NHIF_calculations=calc_NHIF(gross_salary)
            document.getElementById("NHIF").innerText=NHIF_calculations
            let PAYEE_calculations= calc_final_payee(taxable_income)
            // console.log(PAYEE_calculations)
            document.getElementById("Final_Payee").innerText= PAYEE_calculations.toFixed(2)
            let net_pay=calc_net_pay(gross_salary,NHIF_calculations,nssf,nhdf,PAYEE_calculations)
            document.getElementById("Net_pay").innerText=net_pay.toFixed(2)

        }

        else {
            alert("input all fields")
        }
    }
)
function calc_gross_salary(a, b) {
    gross_salary = a + b
    return gross_salary
}
function calc_NSSF(gross_salary, nssf_rate = 0.06) {
    if (gross_salary > 0  && gross_salary < 18000) {
         nssf = gross_salary * nssf_rate
    }
    else {
        nssf = 18000 * nssf_rate
    }
    return nssf
}
function calc_NHDF(gross_salary,nhdf_rate=0.015){
    nhdf=gross_salary*nhdf_rate
    return nhdf
    
}
function calc_taxable_income(gross_salary, nssf,nhdf){
    taxable_income=gross_salary-(nssf+nhdf)
    return taxable_income

}
function calc_NHIF(gross_salary){
    if(gross_salary<5999){
        NHIF_calculations=150 
     }
     else if(gross_salary<7999){
         NHIF_calculations=300
     }
     else if(gross_salary<11999){
         NHIF_calculations=400
     }
     else if(gross_salary<14999){
         NHIF_calculations=500
     }
     else if(gross_salary<19999){
         NHIF_calculations=600
     }
     else if(gross_salary<24999){
         NHIF_calculations=750
     }
     else if(gross_salary<29999){
         NHIF_calculations=850
     }
     else if(gross_salary<34999){
         NHIF_calculations=900
     }
     else if(gross_salary<39999){
         NHIF_calculations=950
     }
     else if(gross_salary<44999){
         NHIF_calculations=1000
     }
     else if(gross_salary<49999){
         NHIF_calculations=1100
     }
     else if(gross_salary<59999){
         NHIF_calculations=1200
     }
     else if(gross_salary<69999){
         NHIF_calculations=1300
     }
     else if(gross_salary<79999){
         NHIF_calculations=1400
     }
     else if(gross_salary<89999){
         NHIF_calculations=1500
     }
     else if(gross_salary<99999){
         NHIF_calculations=1600
     }
     else {
         NHIF_calculations=1700
     }
     
     return NHIF_calculations
}
function calc_final_payee(taxable_income){
    let relief=2400
    if(taxable_income<24000){
        PAYEE_calculations=0
    }
    else if(taxable_income>24000 && taxable_income<32333){
        PAYEE_calculations= (24000*0.1)+(taxable_income-24000)*0.25 - (2400)
    }
    else{PAYEE_calculations= (24000*0.1) + (8333*0.25) + (taxable_income-32333)*0.3 - (2400)}
    return PAYEE_calculations
}
function calc_net_pay(gross_salary,NHIF,nssf,nhdf,Final_Payee){
    net_pay=gross_salary-(nssf+nhdf+NHIF+Final_Payee)
    return net_pay
}