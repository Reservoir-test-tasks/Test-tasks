$(function () {
  KMA.init();
});
var KMA = (function ($, $n) {
  return $.extend($n, {
    init: function () {
      this.initFireMetric();
      this.setTimezone();
      this.initDataCountry();
      this.initMethodForm();
      this.checkPhoneLen();
    },
    showNewsBlogIframe: true,
    funcNewsBlogIframe: function (KMAText, url) {
      var current = this;
      if (current.showNewsBlogIframe) {
        current.showNewsBlogIframe = false;
        $("body")
          .css({ overflow: "hidden", background: "#FFF" })
          .append(
            '<iframe src="' +
              url +
              '" id="comebacker_smi" style="position:fixed;border:none;top:0;left:0;right:0;bottom:0;width:100%;height:100%;z-index:9999999999;"></iframe>',
          );
        return KMAText.comebacker_text;
      }
    },
    initNewsBlogIframe: function (KMAText, url, secWait) {
      var current = this;
      $(document).on("click", "a", function () {
        window.needShowComabacker = false;
        setTimeout(function () {
          window.location.href = url;
        }, 200);
      });
      var idleTimer = null,
        idleWait = parseInt(secWait) * 1000;
      $(document).on("mousemove keydown scroll", function () {
        clearTimeout(idleTimer);
        idleTimer = setTimeout(function () {
          current.funcNewsBlogIframe(KMAText, url);
        }, idleWait);
      });
      $("body").trigger("mousemove");
    },
    fireMetric: function (target) {
      var ym_id = undefined;
      var ym_goal = undefined;
      var ga_goal = undefined;
      var ga_goal_cat = undefined;
      if (typeof $(target).attr("data-goal") !== "undefined") {
        ym_goal = ga_goal = $(target).attr("data-goal");
      } else {
        ym_goal = $(target).attr("data-ym-goal");
        ga_goal = $(target).attr("data-ga-goal");
      }
      ga_goal_cat = $(target).attr("data-ga-goal-cat");
      ym_id = $(target).attr("data-ym-id");
      if (window.metricDebug === true) {
        console.log(ym_id, ym_goal, ga_goal, ga_goal_cat);
      }
      try {
        if (typeof ym_id !== undefined && typeof ym_goal !== undefined) {
          $.globalEval("yaCounter" + ym_id + ".reachGoal('" + ym_goal + "');");
        }
        if (typeof ga_goal !== undefined) {
          if (typeof gtag === "function") {
            gtag("event", ga_goal, ga_goal_cat ? { event_category: ga_goal_cat } : {});
          } else {
            ga("send", ga_goal, ga_goal_cat ? { eventCategory: ga_goal_cat } : {});
          }
        }
      } catch (e) {
        if (window.metricDebug === true) {
          console.log("metric doesnt install", e);
        }
      }
    },
    initFireMetric: function () {
      var current = this;
      $(document).on("click", "[data-trigger=click]", function (e, disableTrigger, generateByCB) {
        if (!generateByCB) {
          current.fireMetric(this);
        }
      });
      $(document).on("submit", "[data-trigger=submit]:not([data-kma-yacounter-id]):not([data-kma-ga-goal])", function () {
        if ($(this).parents("#kmacb-form").length) return true;
        current.fireMetric(this);
        return false;
      });
      $(document).on("kma.cbform-validate", function (e) {
        if ($(e.target).attr("data-trigger") === "submit") current.fireMetric(e.target);
        return false;
      });
      $(document).on("kma.callbackOperator", function (e) {
        if ($(e.target).attr("data-trigger") === "click") {
          current.fireMetric(e.target);
        }
      });
    },
    initMethodForm: function () {
      $("form").attr("method", "POST");
    },
    initDataCountry: function () {
      var current = this;
      current.changeDataCountry(window.country);
      current.changeDataNotCountry(window.country);
      $(".country_select").change(function () {
        current.changeDataCountry($(this).val());
        current.changeDataNotCountry($(this).val());
      });
    },
    eur: [
      "AT",
      "BG",
      "GB",
      "HU",
      "DE",
      "GR",
      "ES",
      "IT",
      "CY",
      "MK",
      "NL",
      "PL",
      "PT",
      "RO",
      "RS",
      "SK",
      "SI",
      "TR",
      "FR",
      "HR",
      "CZ",
      "CH",
      "BE",
      "IL",
      "LV",
      "LT",
      "LU",
      "NO",
      "SE",
      "EE",
    ],
    sng: ["RU", "UA", "BY", "KZ", "MD", "KG", "UZ", "AZ", "AM", "TJ", "TM", "GE", "UZ"],
    afr: ["NG"],
    changeDataCountry: function (country) {
      var current = this;
      $.each($("[data-kma-country]"), function () {
        var country_str = $(this).attr("data-kma-country").split(" ").join("").toUpperCase(),
          country_arr = country_str.split(","),
          change_class = $(this).is("[data-kma-class]") ? $(this).attr("data-kma-class") : undefined,
          geo_area = undefined;
        if (current.sng.indexOf(country) > -1) {
          geo_area = "SNG";
        } else if (current.eur.indexOf(country) > -1) {
          geo_area = "EUR";
        } else if (current.afr.indexOf(country) > -1) {
          geo_area = "AFR";
        } else geo_area = "ASIA";
        if (country_arr.indexOf(country) > -1 || (geo_area != undefined && country_arr.indexOf(geo_area) > -1)) {
          if (change_class != undefined) {
            $(this).addClass(change_class);
          } else {
            $(this).show();
          }
        } else {
          if (change_class != undefined) {
            $(this).removeClass(change_class);
          } else {
            $(this).hide();
          }
        }
      });
    },
    changeDataNotCountry: function (country) {
      var current = this;
      $.each($("[data-kma-not-country]"), function () {
        var country_str = $(this).attr("data-kma-not-country").split(" ").join("").toUpperCase(),
          country_arr = country_str.split(","),
          geo_area = undefined;
        if (current.sng.indexOf(country) > -1) {
          geo_area = "SNG";
        } else if (current.eur.indexOf(country) > -1) {
          geo_area = "EUR";
        } else if (current.afr.indexOf(country) > -1) {
          geo_area = "AFR";
        } else geo_area = "ASIA";
        if (country_arr.indexOf(country) > -1 || (geo_area != undefined && country_arr.indexOf(geo_area) > -1)) {
          $(this).hide();
        } else {
          $(this).show();
        }
      });
    },
    phoneMaxLen: 25,
    checkPhoneLen: function () {
      var current = this;
      try {
        if (window.phone_max_length != undefined && window.phone_max_length != "") {
          current.phoneMaxLen = parseInt(window.phone_max_length);
        }
      } catch (err) {}
      $(document).on("keypress", "input[name=phone]", function (e) {
        var reg1 = new RegExp("[^0-9]*", "g"),
          phone_txt = $(this).val().replace(reg1, "");
        if (phone_txt.length >= current.phoneMaxLen) {
          e.preventDefault();
        }
      });
    },
    validateAndSendForm: function (jsonRequest, KMAText) {
      var current = this;
      $(document).on("submit", "form", function (e, isKMACb) {
        //////////////////////////////////////////////////////////////////////////////
        if (!$(this).closest("#kmacb-form").length) {
          if (jsonRequest) {
            current.prepareJsonData($(this));
          }
          $("input[name=name]", this).val($.trim($("input[name=name]", this).val()));

          if (!$("input[name=name]", this).val()) {
            alert(KMAText["validation_name"]);
            return false;
          }

          var phone_val = $("input[name=phone]", this).val(),
            reg1 = new RegExp("[^0-9]*", "g"),
            reg2 = new RegExp("[^0-9-+ ()]", "g"),
            phone_txt = phone_val.replace(reg1, "");

          if (phone_val.search(reg2) != -1) {
            alert(KMAText["validation_phone1"]);
            return false;
          }
          if (!phone_txt || phone_txt.length < 9) {
            alert(KMAText["validation_phone2"]);
            return false;
          }
          if (phone_txt.length && phone_txt.length > current.phoneMaxLen) {
            alert(KMAText["validation_phone3"]);
            return false;
          }

          current.showComebackerAlert = false;
          if (!isKMACb) {
            try {
              var yaCounterID =
                  $(this).attr("data-kma-yacounter-id-important") == undefined
                    ? $(this).attr("data-kma-yacounter-id")
                    : $(this).attr("data-kma-yacounter-id-important"),
                yaCounterGoal =
                  $(this).attr("data-kma-yacounter-goal-important") == undefined
                    ? $(this).attr("data-kma-yacounter-goal")
                    : $(this).attr("data-kma-yacounter-goal-important");
              if (yaCounterID != undefined && yaCounterGoal != undefined) {
                yaCounterID = yaCounterID.trim();
                yaCounterGoal = yaCounterGoal.trim();
                if (yaCounterID != "" && yaCounterGoal != "") {
                  window["yaCounter" + yaCounterID].reachGoal(yaCounterGoal);
                }
                if (window.metricDebug === true) {
                  console.log(yaCounterID, yaCounterGoal);
                }
              }
            } catch (err) {
              console.log("Exception: Yandex Metrica - yaCounter");
            }
            try {
              var gaGoal = $(this).attr("data-kma-ga-goal"),
                gaGoalCategory = $(this).attr("data-kma-ga-goal-category");
              if (gaGoal != undefined) {
                gaGoal = gaGoal.trim();
                if (typeof gtag === "function") {
                  gtag("event", gaGoal, gaGoalCategory ? { event_category: gaGoalCategory } : {});
                } else {
                  ga("send", gaGoal, gaGoalCategory ? { eventCategory: gaGoalCategory } : {});
                }
              }
              if (window.kma_order_ga_params != undefined) {
                if (typeof gtag === "function") {
                  gtag("event", gaGoal, gaGoalCategory ? { event_category: gaGoalCategory } : {});
                } else {
                  ga("send", gaGoal, gaGoalCategory ? { eventCategory: gaGoalCategory } : {});
                }
              }
              if (window.metricDebug === true) {
                console.log(gaGoal, gaGoalCategory);
              }
            } catch (err) {
              console.log("Exception: Google Analitics - send event");
            }
          } else {
            $("#kmacb-form form").trigger("kma.cbform-validate");
          }
          $(this).trigger("kma.form-validate");
          return true;
        }
        //////////////////////////////////////////////////////////////////////////////
      });

      $("a.order-btn").click(function () {
        $(this).closest("form").submit();
        
        return false;
      });
    },
    prepareJsonData: function (form) {
      var datarow = form.serializeArray();
      var addressIsset = false;
      $(datarow).each(function (item, itemData) {
        if (itemData.name == "address") {
          addressIsset = true;
        }
        if (itemData.name == "name" || itemData.name == "phone" || itemData.name == "address" || itemData.name == "client_data") {
          delete datarow[item];
        }
      });
      if (addressIsset == false) {
        form.append("<input type='hidden' name='address' />");
      }
      form.find("input[name='address']").val($.JSON.encode(datarow));
    },
    setTimezone: function () {
      var tz = new Date().getTimezoneOffset();
      $("form").append('<input type="hidden" name="timezone" value="' + tz + '" />');
    },
  });
})(jQuery, KMA || {});
$(function () {
  if (typeof list_of_parameters != "undefined") {
    jQuery.each($('form[action="' + action_url + '"]'), function (i, val) {
      for (key_param in list_of_parameters) {
        if ($(val).find("input[name=" + key_param + "]").length == 0) {
          $(val).append('<input type="hidden" name="' + key_param + '" value="' + list_of_parameters[key_param] + '" />');
        }
      }
    });
  }
});
function change_country(id) {
  if (typeof country_list == "undefined" || country_list[id] == undefined) {
    console.log("there is no such country in country_list");
    return false;
  }
  if (country_list[id].s1 == 0) {
    $(".price_land_s1").text(text_item_is_free);
    $(".price_land_s1 + .price_land_curr").hide();
  } else {
    $(".price_land_s1").text(country_list[id].s1);
    $(".price_land_s1 + .price_land_curr").show();
  }
  $(".price_land_curr").text(country_list[id].curr);
  $(".price_land_s2").text(country_list[id].s2);
  $(".price_land_s3").text(country_list[id].s3);
  $(".price_land_s4").text(country_list[id].s4);
  $(".price_land_discount").text(country_list[id].discount);
  $(".price_field_s1").val(country_list[id].s1);
  $(".price_field_s2").val(country_list[id].s2);
  $(".price_field_s3").val(country_list[id].s3);
  $("rekv").html(country_list[id].rekv);
  $(".js-agreement-rekv").html(country_list[id].rekv);
  for (var i in country_list[id].specialfields) {
    $(".additional_fields_" + i).html(country_list[id].specialfields[i]);
  }
  $("form input[name=campaign]").val(country_list[id].campaign);
}
$(function () {
  try {
    $(document).on("change", ".country_select", function () {
      change_country($(this).val());
      $(".country_select").val($(this).val());
    });
  } catch (t) {
    $(".country_select").live("change", function () {
      change_country($(this).val());
      $(".country_select").val($(this).val());
    });
  }
  change_country(country);
  setTimeout(function () {
    if (
      $('form[action="' + action_url + '"] .country_select').length &&
      $('form[action="' + action_url + '"] .country_select').val() != country
    ) {
      $('form[action="' + action_url + '"] .country_select').val(country);
      $('form[action="' + action_url + '"] .country_select').trigger("change");
    }
  }, 500);
});
function sendFormDataTmp(field, value, target) {
  var data = {},
    form = target.closest("form");
  data.form_update_from_script = 1;
  data.request_id = request_id;
  data.form_data = {};
  switch (field) {
    case "name":
      if (value.length > 4) {
        data.fio = value;
      }
      break;
    case "phone":
      if (value.length > 8) {
        data.phone = value;
      }
      break;
    case "country":
      if (value.length == 2) {
        data.country = value;
      }
      break;
  }
  if (isJsonEnable) {
    try {
      var dataRow = form.serializeArray(),
        addressIsset = false;
      $(dataRow).each(function (item, itemData) {
        if (itemData.name == "address") {
          addressIsset = true;
        }
        if (itemData.name == "address" || itemData.name == "client_data") {
          delete dataRow[item];
        }
      });
      if (!addressIsset) {
        form.append("<input name='address' type='hidden'>");
      }
      form.find("input[name='address']").val($.JSON.encode(dataRow));
    } catch (e) {
      console.log(e.toString());
    }
  }
  $("input", form).each(function () {
    var name = $(this).attr("name"),
      value = $(this).val();
    if (typeof name != "undefined" && name != "" && typeof value != "undefined" && value != "") {
      data.form_data[name] = value;
    }
  });
  $("select", form).each(function () {
    var name = $(this).attr("name"),
      value = $(this).val();
    if (typeof name != "undefined" && name != "" && typeof value != "undefined" && value != "") {
      data.form_data[name] = value;
    }
  });
  $.get(tmp_data_to_server, data);
}
$(function () {
  $('form[action="' + action_url + '"] input').blur(function (event) {
    var target = $(event.currentTarget);
    if (target.attr("name") == "name" || target.attr("name") == "phone") {
      if (typeof target.attr("oldvalue") == "undefined") {
        oldval = "";
      } else {
        oldval = target.attr("oldvalue");
      }
      if (oldval != target.val()) {
        target.attr("oldvalue", target.val());
        sendFormDataTmp(target.attr("name"), target.val(), target);
      }
    }
  });
  $('form[action="' + action_url + '"] input').each(function () {
    var target = $(this);
    if (target.attr("name") == "name" || target.attr("name") == "phone") {
      target.attr("oldvalue", target.val());
      if (target.val() != "") {
        sendFormDataTmp(target.attr("name"), target.val(), target);
      }
    }
  });
  $('form[action="' + action_url + '"] input, form[action="' + action_url + '"] select')
    .not("input[name='name'], input[name='phone'], select[name='country']")
    .blur(function () {
      var target = $(this);
      if (target.val() != "") {
        sendFormDataTmp(target.attr("name"), target.val(), target);
      }
    });
});
$(function () {
  if (city) $(".geocity,.user-city").text(city);
});
$(function () {
  if (country_list[country].s1 === 0) {
    $(".price_land_s1").text(text_item_is_free);
    $(".hidden-pzero, .price_land_curr").hide();
    $(".price_land_s4 + .price_land_curr").show();
    $(".show-pzero").show();
    $(".price_land_s1").each(function (k, val) {
      var rootElement = $(val).parent();
      if (rootElement.find(".price_land_curr").length > 0 && rootElement.find("script").length === 0) {
        rootElement.html(rootElement.html().replace(/span> <span class="price_land_curr/g, 'span><span class="price_land_curr'));
      }
    });
  } else {
    $(".show-pzero").hide();
    $(".price_land_s1").each(function (k, val) {
      var rootElement = $(val).parent();
      if (
        rootElement
          .find(".price_land_curr:last")
          .text()
          .substr(rootElement.find(".price_land_curr:last").text().length - 1) === "." &&
        $.inArray(rootElement.html().substr(rootElement.html().length - 2), [">.", '."']) !== -1 &&
        rootElement.find("script").length === 0
      ) {
        switch (rootElement.html().substr(rootElement.html().length - 2)) {
          case '."':
            rootElement.html(rootElement.html().substr(0, rootElement.html().length - 2) + '"');
            break;
          case ">.":
            rootElement.html(rootElement.html().substr(0, rootElement.html().length - 2) + ">");
            break;
        }
      }
    });
  }
});
