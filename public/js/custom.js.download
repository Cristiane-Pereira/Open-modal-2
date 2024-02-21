const _CONSOLE_DEBUG = false;
const default_locale = {
    defaultLocale: "en",
    locales: [
        {
            name: "en",
            options: {
                toolbar: {
                    download: "Download SVG",
                    selection: __("selection"),
                    selectionZoom: __("selectionZoom"),
                    zoomIn: __("zoomIn"),
                    zoomOut: __("zoomOut"),
                    pan: __("pan"),
                    reset: __("reset"),
                },
            },
        },
    ],
};

const defaultAjaxErrorHandler = function (response) {
    let errors = "";

    if (response.responseJSON === undefined) {
        return;
    }

    response = response.responseJSON;

    if (typeof response.errors === "object") {
        errors = "";
        $.map(response.errors, function (v) {
            let error = v + "<br>\n";

            if (typeof v === "object") {
                error = "";
                $.map(v, function (i) {
                    error += i + "<br>\n";
                });
            }

            errors += error;
        });
    } else if (typeof response.errors === "string" && response.errors !== "") {
        errors = response.errors;
    } else if (typeof response.error === "string" && response.error !== "") {
        errors = response.error;
    } else if (
        typeof response.message === "string" &&
        response.message !== ""
    ) {
        errors = response.message;
    } else {
        errors = response;
    }

    Swal.fire({
        title: `${__("Attention!")}`,
        icon: "error",
        html: `<div style="text-align: left;">${errors}</div>`,
    });
};

$.ajaxSetup({
    cache: false,
    headers: {
        "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
        Accept: "application/json",
    },
    beforeSend() {
        if ($(`#filters-refresh-config`).is(":visible")) {
            $(`#filters-auto-refresh`)
                .find("i")
                .addClass("mdi-spin text-warning");
        } else {
            helper.startLoading();
        }
    },
    complete() {
        $(`#filters-auto-refresh`)
            .find("i")
            .removeClass("mdi-spin text-warning");
        helper.stopLoading();
    },
    error: defaultAjaxErrorHandler,
});

const helper = {
    hours_to_seconds: (value) => {
        if (value === '' || !value) {
            return 0;
        }

        value = value.match(/:/g).length === 2 ? value : `${value}:00`;

        return Number(
            value.split(":").reduce((acc, time) => 60 * acc + Number(time))
        );
    },
    datatables: {
        sanitize(data, type, row) {
            return data || "-";
        },

        formatCallingNumber(data, type, row) {
            if (data) {
                return `<div data-plugin="tippy" title="${__(
                    "Filter through this"
                )}" data-number="${data}" class="d-flex align-items-center w-100 justify-content-between pe-2 cursor-pointer serch_calling_number">
                            ${data}
                            <i class="mdi mdi-magnify ms-1 text-info"></i>
                        </div>`;
            }
            return "-";
        },
        click_to_move(data, type, row) {
            if (data) {
                return `<div class="d-flex align-items-center justify-content-between w-100">
                            ${data}
                            <i data-agent-name="${
                                row["agent_name"]
                            }" data-login-id="${row["login"]}"
                            data-plugin="tippy" title="${__(
                                "Manage skills"
                            )}" class="float-end mdi mdi-account-settings ms-1 text-info cursor-pointer click-to-move"></i>
                        </div>`;
            }

            return "-";
        },
        row_actions(data, type, row) {
            return `<div class="dropend">
                <span class="mdi mdi-dots-vertical cursor-pointer dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false"></span>
  
                <ul class="dropdown-menu py-2 pe-2 custom-dropdown">
                    
                    <li class="cursor-pointer real-time-monitoring" data-agent-name="${row["agent_name"]}" data-login-id="${row["login"]}">
                        <i class="mdi mdi-video-outline ms-1 text-info" ></i>
                        ${__("Real-time monitoring")}
                    </li>
                    <li class="cursor-pointer click-to-move" data-agent-name="${row["agent_name"]}" data-login-id="${row["login"]}">
                        <i class="mdi mdi-account-settings ms-1 text-info" ></i>
                        ${__("Manage skills")}
                    </li>
                </ul>

            </div>`;
        },
        voice_monitoring(data, type, row) {

            return `<div class="form-check form-switch">
                <input class="form-check-input mx-auto voice-monitoring-enable" type="checkbox" role="switch" 
                data-agent-name="${row["agent_name"]}" data-login-id="${row["login"]}" data-station="${row["extension"]}">
            </div>`;
        },
        datetime_format: function (data, type, row) {
            if (! data) {
                return `-`;
            }

            let date = moment(data);

            if (date.isValid() && type === "display") {
                return date.format("L [<sup>]HH:mm[</sup>]");
            }

            return data;
        },
        date_format: function (data, type = null, row = null) {
            if (! data) {
                return `-`;
            }

            let date = moment(data);

            if (date.isValid() && type === "display") {
                return date.format("DD/MM/YYYY");
            }

            return data;
        },
        time_format: function (data, type, row) {
            if (!data || isNaN(Number(data))) {
                return data || `-`;
            }
            if (type === 'display' || type === 'filter') {
                let hours = ("0" + Math.floor(data / 3600)).slice(-2);
                let minutes = ("0" + Math.floor(data / 60) % 60).slice(-2);
                let seconds = ("0" + data % 60).slice(-2);

                return `${hours}:${minutes}`;
            }

            return moment().startOf("day").format("HH:mm");
        },
        percentage_format: function (data, type, row) {
            if (!data) {
                return `-`;
            }

            if (type === "display") {
                return number_formatter(data) + "%";
            }

            return data;
        },
        number_format(data, type, row) {
            return number_formatter(data, 0);
        },
        decimal_format(data, type, row) {
            if (!data) {
                return `-`;
            }

            if (type === "display") {
                return number_formatter(data);
            }

            return data;
        },
        currency_format(data, type, row) {
            if (!data) {
                return `-`;
            }

            if (type === "display") {
                return currency_formatter(data);
            }

            return data;
        },
        seconds_to_time: function (data, type, row) {
            if (! data) {
                return "00:00:00";
            }

            let number = Number(data);

            if (isNaN(number)) {
                return data;
            }

            if (Number(data) >= 86400) {
                let hours = Math.floor(data / 3600);
                let minutes = ("0" + Math.floor(data / 60) % 60).slice(-2);
                let seconds = ("0" + data % 60).slice(-2);

                return `${hours}:${minutes}:${seconds}`;
            }

            return moment().startOf("day").seconds(data).format("HH:mm:ss");
        },
        abandoned(data, type, row) {
            if (!data) {
                return "0";
            }

            if (type == "display") {
                return data.toLocaleString();
                // return `<a href="javascript:void(0)" onclick="page.abandoned(${row['skill']})">${data}</a>`
                //return data.toLocaleString();
            }

            return data;
        },
        skills(data, type, row, meta) {
            if (type !== "display") {
                return data;
            }

            let strings = [];

            for (const [key, value] of Object.entries(data || [])) {
                let string = `${value.skill} - ${value.name}`,
                    detail = `skills_${meta.row}`;

                if (+key) {
                    string = `<span data-group="skills" data-row-detail="${detail}" style="display: none">${string}<br></span>`;
                } else {
                    string = `<div class="d-flex align-items-center justify-content-between">
                                  <span>${string}</span>
                                  <span ${
                                      data.length < 2 ? `class="d-none"` : ""
                                  }>
                                      <i data-group="skills" data-row-detail="${detail}" class="fa fa-eye text-info text-right m-l-5 cursor-pointer show-row-detail"
                                         data-toggle="tooltip" title="${__(
                                             "Show others"
                                         )} ${data.length} itens"></i>
                                      <sup>${data.length}</sup>
                                  </span>
                              </div>`;
                }

                strings.push(string);
            }

            return strings.join("");
        },
        skillsByComma(data, type, row, meta, stringDefault) {
            if (type != "display") {
                return data;
            }

            let strings = [];
            let skills = data.split(",");
            let skillsNumbers = row.Skills.split(",");
            let skillsLevels = row.levels.split(",");
            let lastSkills = row.last_skills.split(",");
            let randomNumber = Math.floor(Math.random() * 9000 + 1);

            for (const [key, value] of Object.entries(skills)) {
                let string = eval(stringDefault);

                if (+key) {
                    string = `<span data-group="skills" data-row-detail="${randomNumber}" style="display: none">${string}<br></span>`;
                } else {
                    string = `<div class="d-flex align-items-center justify-content-between">
                                  <span>${string}</span>
                                  <span ${
                                      skills.length < 2 ? `class="d-none"` : ""
                                  }>
                                      <i data-group="skills" data-row-detail="${randomNumber}" class="fa fa-eye text-info text-right m-l-5 cursor-pointer show-row-detail"
                                         data-toggle="tooltip" title="${__(
                                             "Display"
                                         )} ${skills.length} itens (${
                        meta.settings.aoColumns[meta.col].title
                    })"></i>
                                      <sup>${skills.length}</sup>
                                  </span>
                              </div>`;
                }

                strings.push(string);
            }

            return strings.join("");
        },
        splitByComma(data, type, row, meta) {
            if (type != "display") {
                return data;
            }

            let strings = [],
                splitted = data.split(",");

            for (const [key, value] of Object.entries(splitted)) {
                let string = value;

                if (+key) {
                    string = `<span data-group="${meta.col}" data-row-detail="${meta.row}" style="display: none">${string}<br></span>`;
                } else {
                    string = `<div class="d-flex align-items-center justify-content-between">
                                  <span>${value}</span>
                                  <span ${
                                      splitted.length < 2
                                          ? `class="d-none"`
                                          : ""
                                  }>
                                      <i data-group="${
                                          meta.col
                                      }" data-row-detail="${
                        meta.row
                    }" class="fa fa-eye text-info text-right m-l-5 cursor-pointer show-row-detail"
                                         data-toggle="tooltip" title="${__(
                                             "Display"
                                         )} ${splitted.length} itens (${
                        meta.settings.aoColumns[meta.col].title
                    })"></i>
                                      <sup>${splitted.length}</sup>
                                  </span>
                              </div>`;
                }

                strings.push(string);
            }

            return strings.join("");
        },
        agents(data, type, row, meta) {
            if (type != "display") {
                return data;
            }

            let strings = [];

            for (const [key, value] of Object.entries(data || [])) {
                let string = `${value.login_id} - ${value.agent_name}`,
                    detail = value.pivot.agent_group_id || value.pivot.user_id;

                if (+key) {
                    string = `<span data-group="agents" data-row-detail="${detail}" style="display: none">${string}<br></span>`;
                } else {
                    string = `<div class="d-flex align-items-center justify-content-between">
                                  <span>${string}</span>
                                  <span ${
                                      data.length < 2 ? `class="d-none"` : ""
                                  }>
                                      <i data-group="agents" data-row-detail="${detail}" class="fa fa-eye text-info text-right m-l-5 cursor-pointer show-row-detail"
                                         data-toggle="tooltip" title="${__(
                                             "Display"
                                         )} ${data.length} itens (${
                        meta.settings.aoColumns[meta.col].title
                    })"></i>
                                      <sup>${data.length}</sup>
                                  </span>
                              </div>`;
                }

                strings.push(string);
            }

            return strings.join("");
        },
        agent_status(data, type, row) {
            if (type != "display") {
                return data;
            }

            if (!data) {
                return `-`;
            }

            let icon = "mdi mdi-headset";

            if (data.indexOf("PAUSA") !== -1) {
                icon = "mdi mdi-coffee-outline text-secondary";
            }

            if (data.indexOf("LIVRE") !== -1) {
                icon = "mdi mdi-phone text-success";
            }

            if (data.indexOf("FALANDO") !== -1) {
                icon = "mdi mdi-phone-in-talk text-warning";
            }

            if (data.indexOf("UNKNOWN") !== -1) {
                icon = "fa fa-question text-muted";
            }

            return `<div class="d-flex align-items-center justify-content-between w-100">${data}&nbsp;<i class="pull-right ${icon}"></i></div>`;
        },
        direction(data, type, row) {
            if (!data) {
                return `-`;
            }

            switch (data.toUpperCase()) {
                case "IN":
                    return `Entrante`;
                case "OUT":
                    return `Sainte`;
                default:
                    return data;
            }
        },
        array_split(data, type, row, meta) {
            console.log({type});
            if (type !== "display") {
                return data;
            }

            let strings = [];

            for (const [key, value] of Object.entries(data)) {
                let string = `${value.id} - ${value.name}`;

                if (+key) {
                    string = `<span data-group="${meta.col}" data-row-detail="${meta.row}" style="display: none">${string}<br></span>`;
                } else {
                    string = `<div class="d-flex align-items-center justify-content-between">
                                  <span>${string}</span>
                                  <span ${
                                      data.length < 2 ? `class="d-none"` : ""
                                  }>
                                      <i data-group="${
                                          meta.col
                                      }" data-row-detail="${
                        meta.row
                    }" class="fa fa-eye text-info text-right m-l-5 cursor-pointer show-row-detail"
                                         data-toggle="tooltip" title="${__(
                                             "Display"
                                         )} ${
                        data.length
                    } itens (${meta.settings.aoColumns[
                        meta.col
                    ].title.toLowerCase()})"></i>
                                      <sup>${data.length}</sup>
                                  </span>
                              </div>`;
                }

                strings.push(string);
            }

            return strings.join("");
        },
    },
    startLoading() {
        $("#status").fadeIn();
        $("#preloader").fadeIn();
    },
    stopLoading() {
        if (typeof page !== "undefined") {
            if (page.xhr === undefined || page.xhr.readyState !== 1) {
                $("#status").fadeOut();
                $("#preloader").delay(350).fadeOut("slow");
            }
        } else {
            $("#status").fadeOut();
            $("#preloader").delay(350).fadeOut("slow");
        }
    },
};

const cookie = {
    get: (cname) => {
        let name = cname + "=";
        let ca = document.cookie.split(";");
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == " ") {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return undefined;
    },
    set: (cname, cvalue, exdays) => {
        let d = new Date();
        d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
};

$("body").delegate("[data-filter]", "click", function () {
    let target = $(this).data("filter");
    $(".filter-gen:not(" + target + ")").slideUp();
    $(target).slideToggle();
});

$(document).on("click", ".show-row-detail", function () {
    $(window).resize();
    $(this).toggleClass("fa-eye-slash");
    $(
        `span[data-group="${$(this).data("group")}"][data-row-detail="${$(
            this
        ).data("row-detail")}"]`
    ).toggle();
});

$(document).on("change", "[data-cascade-target]", function () {
    let $this = $(this),
        $value = $this.val() === null ? '' : $this.val(),
        isMultiple = $this.attr("multiple") === "multiple",
        disableAutoSelect = $this.data('cascade-autoselect') === false,
        $target = $(`${$this.data("cascade-target")}`),
        filtered = [];

    $target.val("").trigger("change");

    $target
        .find("option")
        .prop("selected", false)
        .prop("disabled", true)
        .filter((key, item) => {
            let search = $(item).data("cascade");

            // Trata o value para o uso do $.inArray
            let array = isMultiple ? $value : [$value];

            // Se nenhum item foi selecionado, exibir todas as opções
            if (!array.length) {
                return search === undefined;
            }

            if (search === undefined) {
                return false;
            }

            return $.inArray(search.toString(), array) !== -1;
        })
        .filter((key, item) => {
            let val = $(item).val();

            if ($.inArray(val, filtered) !== -1) {
                return false;
            } else {
                filtered.push(val);
                return true;
            }
        })
        .prop("selected", ($value.length > 0) && !disableAutoSelect)
        .prop("disabled", false);

    if ($target.hasClass('selectpicker')) {
        $target.selectpicker("refresh");
    }
});

/**---------------------------------------------------------
 *
 * Responde ao datatable de rechamadas no campo @calling_number
 * A function adiciona o numero como filtro
 *
 ----------------------------------------------------------*/

$(document).on("click", ".serch_calling_number", function () {
    let search = $(this).data("number");
    $(this)
        .closest(".dataTables_wrapper")
        .find("input[type=search]")
        .focus()
        .val(search)
        .keyup();
    // $(`#datatable-reports-historical-skill-recall_filter input[type=search]`).focus().val(search).keyup();
});

$("[data-cascade-target]").change();

// Pra arrumar um bug que faz com que os selectpickers fiquem vazios quando instanciados
$(`.selectpicker`).selectpicker("refresh");
$(`[data-toggle="select2"]`).select2();

Array.prototype.slice
    .call(document.querySelectorAll('[data-plugin="switchery"]'))
    .forEach(function (e) {
        let configs = {
            color: $(e).data("color"),
            size: $(e).data("size") || "small",
        };

        new Switchery(e, configs);
    });

const SPMaskBehavior = function (val) {
        let length = val.replace(/\D/g, "").length;

        if (length < 10) {
            return '0#';
        }

        return length === 11
            ? "(00) 00000-0000"
            : "(00) 0000-00009";
    },
    spOptions = {
        onKeyPress: function (val, e, field, options) {
            field.mask(SPMaskBehavior.apply({}, arguments), options);
        },
    };

const cpfOrCnpjBehavior = function (val) {
    let length = val.replace(/\D/g, "").length;

    if (length < 11) {
        return '0#';
    }

    return length === 11
        ? "000.000.000-00#"
        : "00.000.000/0000-00";
    },
    cpfOrCnpjOptions = {
        onKeyPress: function (val, e, field, options) {
            field.mask(cpfOrCnpjBehavior.apply({}, arguments), options);
        },
    };

$(".phone_mask").mask(SPMaskBehavior, spOptions);

function formatDayWiseTimeSeries(dataset, timestamp, x, z = false) {
    let series = [];

    for (const [key, value] of Object.entries(dataset || {})) {
        let toParse =
            (value[timestamp] || "").indexOf(":") !== -1
                ? moment(value[timestamp], "HH:mm:ss")
                : moment(value[timestamp] + " 00:00:00");

        if (
            value[timestamp].indexOf("-") !== -1 &&
            value[timestamp].indexOf(":") !== -1
        ) {
            toParse = moment(value[timestamp]);
        }

        let arr = [Date.parse(toParse), value[x]];

        if (z !== false) {
            arr.push(value[z]);
        }

        series.push(arr);
    }

    series = series.sort((a, b) => a[0] - b[0]);
    return series;
}

function isBetween(number, a, b, inclusive) {
    let min = Math.min(a, b),
        max = Math.max(a, b);

    return inclusive
        ? number >= min && number <= max
        : number > min && number < max;
}

const number_formatter = (number, decimals = 2) => {
    let float = parseFloat(number || 0);

    if (isNaN(float)) {
        return number;
    }

    return float.toLocaleString("pt-br", {
        minimumFractionDigits: 0,
        maximumFractionDigits: decimals,
    });
};
const currency_formatter = (number, decimals = 2) => {
    let float = parseFloat(number || 0);

    if (isNaN(float)) {
        return number;
    }

    return (
        "R$ " +
        float.toLocaleString("pt-br", {
            minimumFractionDigits: 0,
            maximumFractionDigits: decimals,
        })
    );
};

const animateCSS = (element, animation, prefix = "animate__") =>
    // We create a Promise and return it
    new Promise((resolve, reject) => {
        const animationName = `${prefix}${animation}`;
        const node = document.querySelector(element);

        node.classList.add(`${prefix}animated`, animationName);

        // When the animation ends, we clean the classes and resolve the Promise
        function handleAnimationEnd(event) {
            event.stopPropagation();
            node.classList.remove(`${prefix}animated`, animationName);
            resolve("Animation ended");
        }

        node.addEventListener("animationend", handleAnimationEnd, {
            once: true,
        });
    });

const hour_formatter = (val) => {
    let time = Math.abs(val);

    if (time.toString().length >= 13) {
        return moment(time).format("HH:mm");
    }

    return helper.datatables.seconds_to_time(time);
};

/**---------------------------------------------------------
 *
 * Valida o input modal
 * @number aceita apenas numeros
 *
 ----------------------------------------------------------*/

$(document).on("keyup", "[data-validation]", function () {
    let type = $(this).data("validation");
    let target = $(this).data("validation-target") || false;
    let valid = true;
    let value = $(this).val();
    const number = /[^\d]/gi;
    if (type === "number") {
        const regex = /Dog/gi;
        value = value.replace(number, "");
        $(this).val(value);
    }

    if (target) {
        target = target.split(":");
        let id = target[0];
        let name = target[1];
        let rows = $("#" + id)
            .DataTable()
            .rows()
            .data();
        for (i = 0; i < rows.length; i++) {
            if (rows[i][name] == value) {
                valid = false;
                break;
            }
        }

        if (!valid) {
            $("#modal-create-submit").attr("disabled", true);
            $(this).addClass("is-invalid");
            if (!$(`#alert_${name}`).length) {
                let _alert = `<small id="alert_${name}" class="text-danger"> ${__(
                    `This ${name} already exists`
                )} </small>`;
                $(this).parent().append(_alert);
            }
        } else {
            $("#modal-create-submit").attr("disabled", false);
            $(this).removeClass("is-invalid");
            $(`#alert_${name}`).remove();
        }
    }
});

const small_hour_formatter = (val) => {
    let time = Math.abs(val);

    if (time.toString().length >= 13) {
        return moment(time).format("HH:mm");
    }

    return (time / 60 / 60).toFixed(0) + "h";
};

function mergeDeep(...objects) {
    const isObject = obj => obj && typeof obj === 'object';

    return objects.reduce((prev, obj) => {
        Object.keys(obj).forEach(key => {
            const pVal = prev[key];
            const oVal = obj[key];

            if (Array.isArray(pVal) && Array.isArray(oVal)) {
                prev[key] = pVal.concat(...oVal);
            }
            else if (isObject(pVal) && isObject(oVal)) {
                prev[key] = mergeDeep(pVal, oVal);
            }
            else {
                prev[key] = oVal;
            }
        });

        return prev;
    }, {});
}

const realTimeMonitoring = ()=>{
    
}
