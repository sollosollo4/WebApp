using System.Web;
using System.Web.Optimization;

namespace WebApp
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            bundles.Add(new ScriptBundle("~/bundles/extjs").Include(
                      "~/Scripts/ext-all.js"));

            bundles.Add(new StyleBundle("~/Content/extjs").Include(
                      "~/extjs/resources/css/ext-all.css"));

            bundles.Add(new ScriptBundle("~/app/appjs").Include(
                      "~/app/app.js"));

            bundles.Add(new ScriptBundle("~/app/ext-lang").Include(
                "~/Scripts/ext-lang-ru.js"));

            // Neptune
            bundles.Add(new StyleBundle("~/Content/Neptune").Include(
                "~/extjs/resources/ext-theme-neptune/ext-theme-neptune-all.css"));

            bundles.Add(new ScriptBundle("~/Script/Neptune").Include(
                "~/extjs/ext-theme-neptune.js"));
        }
    }
}
